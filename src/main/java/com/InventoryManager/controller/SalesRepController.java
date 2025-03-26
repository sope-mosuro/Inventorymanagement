package com.InventoryManager.controller;
import com.InventoryManager.config.UserUtil;
import com.InventoryManager.dto.InventoryResponseDTO;
import com.InventoryManager.model.User;
import com.InventoryManager.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SalesRepController {
    private final InventoryService inventoryService;

    @GetMapping("/sales-rep")
    public ResponseEntity<List<InventoryResponseDTO>> getSalesRepInventory() {
        User currentUser = UserUtil.getLoggedInUser(); // Get the logged-in user
        return ResponseEntity.ok(inventoryService.getSalesRepInventory(currentUser.getId()));
    }
}
