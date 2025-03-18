package com.InventoryManager.controller;

import com.InventoryManager.dto.InventoryRequest;
import com.InventoryManager.model.Inventory;
import com.InventoryManager.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Inventory> addInventory(@RequestBody InventoryRequest request) {
        Inventory inventory = inventoryService.addInventory(request.getProductName(), request.getWarehouseName(), request.getQuantity());
        return ResponseEntity.ok(inventory);
    }
}
