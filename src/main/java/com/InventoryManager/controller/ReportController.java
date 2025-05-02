package com.InventoryManager.controller;

import com.InventoryManager.config.UserUtil;
import com.InventoryManager.dto.*;
import com.InventoryManager.model.InventoryTransactions;
import com.InventoryManager.model.User;
import com.InventoryManager.service.ReportService;
import com.InventoryManager.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final SaleService saleService;
    private final ReportService reportService;

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
    @GetMapping("inventory-valuation")
    public ResponseEntity<List<InventoryReportDTO>> getInventoryValuation() {
        return ResponseEntity.ok(reportService.generateInventoryValuationReport());
    }

    @GetMapping("/total-sold-byproduct")
    public ResponseEntity<List<totalSoldRequest>> getTotalSoldByProduct() {
        return ResponseEntity.ok(reportService.productSoldReport());
    }

    @GetMapping("/inventory-transactions")
    public ResponseEntity<List<InventoryTransactionDTO>> filter(@RequestBody InventoryTransactionFilter filter) {
        return ResponseEntity.ok(reportService.getFilteredTransactions(filter));
    }

    @GetMapping("/inventory-purchases")
    public List<InventoryPurchaseDTO> getFilteredPurchases(@RequestBody InventoryPurchaseFilter filter) {
        return reportService.getFilteredPurchases(filter);
    }
}
