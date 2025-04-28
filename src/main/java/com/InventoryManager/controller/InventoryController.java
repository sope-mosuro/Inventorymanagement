package com.InventoryManager.controller;

import com.InventoryManager.dto.AssignInventoryRequestDTO;
import com.InventoryManager.dto.InventoryRequest;
import com.InventoryManager.dto.InventoryResponseDTO;
import com.InventoryManager.model.User;
import com.InventoryManager.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.InventoryManager.service.UserDetailsServiceImpl.logger;

@RestController
@RequestMapping("/api/admin/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping("/add")
    public ResponseEntity<InventoryResponseDTO> addInventory(@RequestBody InventoryRequest request) {
        return ResponseEntity.ok(inventoryService.addInventory( request.getProductName(), request.getWarehouseName(), request.getQuantity()));
    }
    @PostMapping("/assign")
    public ResponseEntity<InventoryResponseDTO> assignInventory(@RequestBody AssignInventoryRequestDTO request) {
        InventoryResponseDTO response = inventoryService.assignInventoryToSalesRep(request);
        return ResponseEntity.ok(response);
    }

    // Admins can fetch any sales rep’s inventory
    @GetMapping("/sales-rep/{salesRepId}")
    public ResponseEntity<List<InventoryResponseDTO>> getSalesRepInventoryByAdmin(@PathVariable Long salesRepId)
    {logger.info("Fetching inventory for Sales Rep ID: {}", salesRepId);
      return ResponseEntity.ok(inventoryService.getSalesRepInventory(salesRepId));

    }

    // Endpoint: Get all inventory stored in a specific warehouse
    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<InventoryResponseDTO>> getWarehouseInventory(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(inventoryService.getWarehouseInventory(warehouseId));
    }

}
