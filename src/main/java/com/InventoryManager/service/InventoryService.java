package com.InventoryManager.service;

import com.InventoryManager.dto.InventoryResponseDTO;
import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.model.Inventory;
import com.InventoryManager.model.Product;
import com.InventoryManager.model.Warehouse;
import com.InventoryManager.repository.InventoryRepository;
import com.InventoryManager.repository.ProductRepository;
import com.InventoryManager.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;

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
}
