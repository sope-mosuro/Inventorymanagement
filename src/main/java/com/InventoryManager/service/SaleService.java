package com.InventoryManager.service;

import com.InventoryManager.config.UserUtil;
import com.InventoryManager.dto.*;
import com.InventoryManager.model.*;
import com.InventoryManager.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SaleService {
    private final SaleRepository saleRepository;
    private final SaleItemRepository saleItemRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final CustomerService customerService;

    public SaleResponseDTO createSale(Long salesRepId, SaleRequestDTO request) {
        User salesRep = UserUtil.getLoggedInUser();


        Customer customer;
        if(request.isWalkInCustomer()){
            customer = customerService.getOrCreateWalkInCustomer();
        }else if(request.getCustomerId() != null){
          customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        } else {
            throw new RuntimeException("Customer must be selected or marked as walk-in");
        }

        Sale sale = new Sale();
        sale.setSalesRep(salesRep);
        sale.setCustomer(customer);
        sale.setPaymentMethod(request.getPaymentMethod());
        sale.setSaleDate(LocalDateTime.now());

        List<SaleItem> saleItems = new ArrayList<>();
        double totalSaleCost = 0.0;

        for (SaleItemRequestDTO itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Check if the sales rep has enough inventory
            Inventory salesRepInventory = inventoryRepository.findByProductAndAssignedTo(product, salesRep)
                    .orElseThrow(() -> new RuntimeException("Product not found in sales rep's inventory"));

            if (salesRepInventory.getQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock available for product: " + product.getName());
            }

            // Deduct from sales rep inventory
            salesRepInventory.setQuantity(salesRepInventory.getQuantity() - itemRequest.getQuantity());
            inventoryRepository.save(salesRepInventory);

            // Calculate cost
            double cost = itemRequest.getQuantity() * product.getPrice();
            totalSaleCost += cost;

            // Create SaleItem
            SaleItem saleItem = new SaleItem();
            saleItem.setProduct(product);
            saleItem.setQuantity(itemRequest.getQuantity());
            saleItem.setPricePerUnit(product.getPrice());
            saleItem.setTotalCost(cost);
            saleItem.setSale(sale);
            saleItems.add(saleItem);
        }

        sale.setTotalCost(totalSaleCost);
        sale = saleRepository.save(sale);
        saleItemRepository.saveAll(saleItems);

        // Map to DTO
        List<SaleItemDTO> saleItemDTOs = saleItems.stream()
                .map(item -> new SaleItemDTO(
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getPricePerUnit(),
                        item.getTotalCost()
                ))
                .toList();

        return new SaleResponseDTO(
                sale.getId(),
                sale.getTotalCost(),
                sale.getSaleDate(),
                sale.getPaymentMethod(),
                salesRep.getName(),
                customer.getName(),
                saleItemDTOs
        );
    }
    @Transactional
    public List<SaleResponseDTO> getTransactionHistory() {
        User loggedInUser = UserUtil.getLoggedInUser();
        boolean isAdmin = loggedInUser.getRole().name().equals("ADMIN");
        List<Sale> sales;
        if (isAdmin) {
            sales = saleRepository.findAll(); // Admin sees all sales
        } else {
            sales = saleRepository.findBySalesRepId(loggedInUser.getId()); // Sales rep sees only their sales
        }

        return sales.stream().map(sale -> new SaleResponseDTO(
                sale.getId(),
                sale.getTotalCost(),
                sale.getSaleDate(),
                sale.getPaymentMethod(),
                sale.getSalesRep().getName(),
                sale.getCustomer().getName(),
                sale.getSaleItems().stream().map(item -> new SaleItemDTO(
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getPricePerUnit(),
                        item.getTotalCost()
                )).toList()
        )).toList();
    }

    @Transactional
    public List<ProductDTO> getBestSellingProducts() {
        return productRepository.findBestSellingProducts()
                .stream()
                .map(product -> new ProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getStock()
                ))
                .toList();
    }

    @Transactional
    public List<UserSalesDTO> getBestSellingReps() {
        return userRepository.findBestSellingReps()
                .stream()
                .map(user -> new UserSalesDTO(
                        user.getId(),
                        user.getName(),
                        user.getTotalSales()
                ))
                .toList();
    }

}
