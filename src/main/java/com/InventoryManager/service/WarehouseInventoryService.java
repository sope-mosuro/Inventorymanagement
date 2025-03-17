package com.InventoryManager.service;

import com.InventoryManager.model.Warehouse;
import com.InventoryManager.model.WarehouseInventory;
import com.InventoryManager.model.Product;
import com.InventoryManager.repository.WarehouseInventoryRepository;
import com.InventoryManager.repository.WarehouseRepository;
import com.InventoryManager.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WarehouseInventoryService {
    private final WarehouseInventoryRepository warehouseInventoryRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;

    // Add or update product quantity in a warehouse
    public WarehouseInventory addOrUpdateInventory(Long warehouseId, Long productId, int quantity) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return warehouseInventoryRepository.findByWarehouseIdAndProductId(warehouseId, productId)
                .map(existingInventory -> {
                    existingInventory.setQuantity(existingInventory.getQuantity() + quantity);
                    return warehouseInventoryRepository.save(existingInventory);
                })
                .orElseGet(() -> warehouseInventoryRepository.save(
                        WarehouseInventory.builder()
                                .warehouse(warehouse)
                                .product(product)
                                .quantity(quantity)
                                .build()
                ));
    }

    // Get inventory for a warehouse
    public List<WarehouseInventory> getWarehouseInventory(Long warehouseId) {
        return warehouseInventoryRepository.findByWarehouseId(warehouseId);
    }
}
