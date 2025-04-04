package com.InventoryManager.service;

import com.InventoryManager.dto.AssignInventoryRequestDTO;
import com.InventoryManager.dto.InventoryResponseDTO;
import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.model.Inventory;
import com.InventoryManager.model.Product;
import com.InventoryManager.model.User;
import com.InventoryManager.model.Warehouse;
import com.InventoryManager.repository.InventoryRepository;
import com.InventoryManager.repository.ProductRepository;
import com.InventoryManager.repository.UserRepository;
import com.InventoryManager.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.InventoryManager.service.UserDetailsServiceImpl.logger;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final UserRepository userRepository;

    @Transactional
    public InventoryResponseDTO addInventory(String productName, String warehouseName, int quantity) {
        Product product = productRepository.findByName(productName)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // Check if there is enough stock available
        if (quantity > product.getStock()) {
            throw new RuntimeException("Not enough stock available to allocate");
        }

        Warehouse warehouse = warehouseRepository.findByName(warehouseName)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));




        Inventory inventory = inventoryRepository.findByProductAndWarehouse(product, warehouse)
                .orElseGet(() -> {
                    Inventory newInventory = new Inventory();
                    newInventory.setProduct(product);
                    newInventory.setWarehouse(warehouse);
                    newInventory.setQuantity(0); // Start from zero if new
                    return newInventory;
                });

        // Increase warehouse inventory and decrease global stock
        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventory = inventoryRepository.save(inventory); // Save inventory update

        int updatedStock = product.getStock() - quantity;
        product.setStock(updatedStock >= 0 ? updatedStock : 0);
        productRepository.saveAndFlush(product); // Save the updated product stock
        return new InventoryResponseDTO(
                inventory.getId(),
                inventory.getQuantity(), // Updated inventory in the warehouse
                new ProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getStock() // Updated global stock
                ),
                warehouse.getName()

        );
    }
    @Transactional
    public InventoryResponseDTO assignInventoryToSalesRep(AssignInventoryRequestDTO request) {
        Product product = productRepository.findByName(request.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Warehouse warehouse = warehouseRepository.findByName(request.getWarehouseName())
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        User salesRep = userRepository.findByName(request.getSalesRepName())
                .orElseThrow(() -> new RuntimeException("Sales rep not found"));

        // Find existing inventory in the warehouse
        Inventory warehouseInventory = inventoryRepository.findByProductAndWarehouse(product, warehouse)
                .orElseThrow(() -> new RuntimeException("Product not available in warehouse"));

        if (request.getQuantity() > warehouseInventory.getQuantity()) {
            throw new RuntimeException("Not enough stock in warehouse");
        }

        // Deduct inventory from warehouse
        warehouseInventory.setQuantity(warehouseInventory.getQuantity() - request.getQuantity());
        inventoryRepository.save(warehouseInventory);

        // Assign inventory to sales rep
        Inventory salesRepInventory = inventoryRepository.findByProductAndAssignedTo(product, salesRep)
                .orElse(new Inventory());

        salesRepInventory.setProduct(product);
        salesRepInventory.setAssignedTo(salesRep);
        salesRepInventory.setQuantity(salesRepInventory.getQuantity() + request.getQuantity());

        inventoryRepository.save(salesRepInventory);

        return new InventoryResponseDTO(
                salesRepInventory.getId(),
                salesRepInventory.getQuantity(),
                new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getStock()),
                warehouse.getName(),
                warehouseInventory.getQuantity() // Remaining inventory in warehouse
        );
    }
//    // Get all inventory assigned to a specific sales rep
    @Transactional
    public List<InventoryResponseDTO> getSalesRepInventory(Long salesRepId) {
        List<Inventory> salesRepInventory = inventoryRepository.findByAssignedToId(salesRepId);
//        logger.info("Inventory for Sales Rep {}: {}", salesRepId, salesRepInventory);


        return salesRepInventory.stream().map(inventory ->
                new InventoryResponseDTO(
                        inventory.getId(),
                        inventory.getQuantity(),
                        new ProductDTO(
                                inventory.getProduct().getId(),
                                inventory.getProduct().getName(),
                                inventory.getProduct().getPrice(),
                                inventory.getProduct().getStock()
                        ),
                        inventory.getWarehouse() != null ? inventory.getWarehouse().getName() : "Not in warehouse"
                )
        ).collect(Collectors.toList());
    }


    // Get all inventory stored in a specific warehouse
    @Transactional
    public List<InventoryResponseDTO> getWarehouseInventory(Long warehouseId) {
        List<Inventory> warehouseInventory = inventoryRepository.findByWarehouseId(warehouseId);
        logger.info("Inventory for Warehouse {}: {}", warehouseId, warehouseInventory);
        return warehouseInventory.stream().map(inventory ->
                new InventoryResponseDTO(
                        inventory.getId(),
                        inventory.getQuantity(),
                        new ProductDTO(
                                inventory.getProduct().getId(),
                                inventory.getProduct().getName(),
                                inventory.getProduct().getPrice(),
                                inventory.getProduct().getStock()
                        ),
                        inventory.getWarehouse().getName()
                )
        ).collect(Collectors.toList());
    }
}
