package com.InventoryManager.controller;

import com.InventoryManager.model.WarehouseInventory;
import com.InventoryManager.service.WarehouseInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/warehouse-inventory")
@RequiredArgsConstructor
public class WarehouseInventoryController {
    private final WarehouseInventoryService warehouseInventoryService;

    @PostMapping("/add")
    public ResponseEntity<WarehouseInventory> addOrUpdateInventory(
            @RequestParam Long warehouseId,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.ok(warehouseInventoryService.addOrUpdateInventory(warehouseId, productId, quantity));
    }

    @GetMapping("/{warehouseId}")
    public ResponseEntity<List<WarehouseInventory>> getWarehouseInventory(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(warehouseInventoryService.getWarehouseInventory(warehouseId));
    }
}
