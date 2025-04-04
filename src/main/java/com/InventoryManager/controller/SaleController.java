package com.InventoryManager.controller;

import com.InventoryManager.config.UserUtil;
import com.InventoryManager.dto.SaleRequestDTO;
import com.InventoryManager.dto.SaleResponseDTO;
import com.InventoryManager.model.User;
import com.InventoryManager.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;

    @PostMapping("/create")
    public ResponseEntity<SaleResponseDTO> createSale(@RequestBody SaleRequestDTO request, Authentication authentication) {
        User currentUser = UserUtil.getLoggedInUser();
        SaleResponseDTO response = saleService.createSale(currentUser.getId(), request);
        return ResponseEntity.ok(response);
    }
}
