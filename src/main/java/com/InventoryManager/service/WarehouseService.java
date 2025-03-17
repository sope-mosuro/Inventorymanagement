package com.InventoryManager.service;

import com.InventoryManager.model.Warehouse;
import com.InventoryManager.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;

    // Create a new warehouse
    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    // Get all warehouses
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    // Get a warehouse by ID
    public Optional<Warehouse> getWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }

    // Update a warehouse
    public Warehouse updateWarehouse(Long id, Warehouse updatedWarehouse) {
        return warehouseRepository.findById(id)
                .map(existingWarehouse -> {
                    existingWarehouse.setName(updatedWarehouse.getName());
                    existingWarehouse.setLocation(updatedWarehouse.getLocation());
                    existingWarehouse.setLowStockThreshold(updatedWarehouse.getLowStockThreshold());
                    return warehouseRepository.save(existingWarehouse);
                })
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
    }

    // Delete a warehouse
    public void deleteWarehouse(Long id) {
        warehouseRepository.deleteById(id);
    }

    // Check if warehouse inventory is below threshold
    public boolean isLowStock(Long warehouseId, int currentStock) {
        return warehouseRepository.findById(warehouseId)
                .map(warehouse -> currentStock < warehouse.getLowStockThreshold())
                .orElse(false);
    }
}
