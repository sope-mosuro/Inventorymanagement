package com.InventoryManager.controller;

import com.InventoryManager.config.UserUtil;
import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.dto.SaleResponseDTO;
import com.InventoryManager.dto.UserSalesDTO;
import com.InventoryManager.model.User;
import com.InventoryManager.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final SaleService saleService;

    @GetMapping("/history")
    public ResponseEntity<List<SaleResponseDTO>> getTransactionHistory() {

        List<SaleResponseDTO> history = saleService.getTransactionHistory();
        return ResponseEntity.ok(history);
    }

    @GetMapping("/best-selling-products")
    public ResponseEntity<List<ProductDTO>> getBestSellingProducts() {
        return ResponseEntity.ok(saleService.getBestSellingProducts());
    }

    @GetMapping("/best-selling-reps")
    public ResponseEntity<List<UserSalesDTO>> getBestSellingReps() {
        return ResponseEntity.ok(saleService.getBestSellingReps());
    }

}
