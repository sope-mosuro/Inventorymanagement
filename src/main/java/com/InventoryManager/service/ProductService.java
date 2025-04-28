package com.InventoryManager.service;

import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.dto.UpdateProductPriceDTO;
import com.InventoryManager.dto.UpdateStockRequestDTO;
import com.InventoryManager.model.InventoryPurchase;
import com.InventoryManager.model.InventoryTransactions;
import com.InventoryManager.model.Product;
import com.InventoryManager.model.TransactionType;
import com.InventoryManager.repository.InventoryPurchaseRepository;
import com.InventoryManager.repository.InventoryTransactionsRepository;
import com.InventoryManager.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final InventoryPurchaseRepository inventoryPurchaseRepository;
    private final InventoryTransactionsRepository inventoryTransactionRepository;



    @Transactional
    public UpdateStockRequestDTO increaseStock(UpdateStockRequestDTO request) {
        Product product = productRepository.findByName(request.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Increase stock
        product.setStock(product.getStock() + request.getQuantity());
        product.setCost_price(request.getCost_price());

        LocalDateTime purchaseDate= request.getPurchaseDate() != null
                ? request.getPurchaseDate()
                : LocalDateTime.now();


       productRepository.save(product);

        // Record inventory purchase
        InventoryPurchase purchase = new InventoryPurchase();
        purchase.setProduct(product);
        purchase.setQuantity(request.getQuantity());
        purchase.setCostPrice(product.getCost_price());
        purchase.setPurchaseDate(purchaseDate);

        inventoryPurchaseRepository.save(purchase);

        InventoryTransactions transaction = new InventoryTransactions();
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setType(TransactionType.Assignment);
        transaction.setQuantity(request.getQuantity());
        transaction.setSource("supplier");
        transaction.setDestination("global stock");
        transaction.setProduct(product);
        inventoryTransactionRepository.save(transaction);// Save the transaction
        // Return DTO
        return new UpdateStockRequestDTO(product.getName(), product.getStock(), product.getCost_price());

    }

    public ProductDTO createProduct(Product product){
         productRepository.save(product);
        return new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getStock());
    }



    public List<ProductDTO> getAllProducts(){
        return productRepository.findAll().stream()
                .map(product -> new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getStock()))
                .toList();

    }

    public UpdateProductPriceDTO UpdatePrice(UpdateProductPriceDTO request){
        Product product = productRepository.findByName(request.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setPrice(request.getPrice());
        productRepository.save(product);


       return new UpdateProductPriceDTO(product.getName(), product.getPrice());
    }
}
