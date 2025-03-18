package com.InventoryManager.service;

import com.InventoryManager.model.Inventory;
import com.InventoryManager.model.Product;
import com.InventoryManager.model.Warehouse;
import com.InventoryManager.repository.InventoryRepository;
import com.InventoryManager.repository.ProductRepository;
import com.InventoryManager.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;

    public Inventory addInventory(String productName, String warehouseName, int quantity) {
        Product product = productRepository.findByName(productName)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Warehouse warehouse = warehouseRepository.findByName(warehouseName)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        Inventory inventory = inventoryRepository.findByProductAndWarehouse(product, warehouse)
                .orElse(new Inventory());

        inventory.setProduct(product);
        inventory.setWarehouse(warehouse);
        inventory.setQuantity(inventory.getQuantity() + quantity);

        return inventoryRepository.save(inventory);
    }
}
