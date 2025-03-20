package com.InventoryManager.controller;

import com.InventoryManager.dto.InventoryRequest;
import com.InventoryManager.dto.InventoryResponseDTO;
import com.InventoryManager.model.Inventory;
import com.InventoryManager.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping("/add")
    public ResponseEntity<InventoryResponseDTO> addInventory(@RequestBody InventoryRequest request) {
        return ResponseEntity.ok(inventoryService.addInventory( request.getProductName(), request.getWarehouseName(), request.getQuantity()));
    }

}
