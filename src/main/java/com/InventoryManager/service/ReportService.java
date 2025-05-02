package com.InventoryManager.service;

import com.InventoryManager.dto.*;
import com.InventoryManager.model.InventoryTransactions;
import com.InventoryManager.model.Product;
import com.InventoryManager.repository.InventoryPurchaseRepository;
import com.InventoryManager.repository.InventoryTransactionsRepository;
import com.InventoryManager.repository.ProductRepository;
import com.InventoryManager.repository.SaleItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class ReportService {
    private final ProductRepository productRepository;
    private final InventoryPurchaseRepository inventoryPurchaseRepository;
    private final SaleItemRepository saleItemRepository;
    private final InventoryTransactionsRepository inventoryTransactionsRepository;

    public List<InventoryReportDTO> generateInventoryValuationReport() {
        List<Product> products = productRepository.findAll();
        List<InventoryReportDTO> reports = new ArrayList<>();



        for (Product product : products) {
            double costPrice = product.getCost_price() != null ? product.getCost_price() : 0.0;
            int totalPurchased = inventoryPurchaseRepository.totalQuantityByProduct(product.getId()).orElse(0);
            int totalSold = saleItemRepository.totalQuantitySoldByProduct(product.getId()).orElse(0);
            double totalRevenue = saleItemRepository.totalRevenueByProduct(product.getId()).orElse(0.0);
            double totalPurchaseCost = totalPurchased * costPrice;
            double cogs = totalSold * costPrice;
            int remainingStock = product.getStock();
            double grossProfit = totalRevenue - cogs;

            reports.add(new InventoryReportDTO(
                    product.getName(), totalPurchased, totalSold, remainingStock,
                    totalPurchaseCost, totalRevenue, cogs, grossProfit
            ));
        }

        return reports;
    }

    public List<totalSoldRequest> productSoldReport() {
        return productRepository.findAll()
                .stream()
                .map(product -> {
                    Optional<Integer> totalSold = saleItemRepository.totalQuantitySoldByProduct(product.getId());
                    if (totalSold == null) {
                        totalSold = Optional.of(0);
                    }
                    return new totalSoldRequest(product.getName(), totalSold);
                })
                .toList();


    }

    public List<InventoryTransactionDTO> getFilteredTransactions(InventoryTransactionFilter filter) {
        LocalDateTime from = (filter.getStartDate() != null) ? filter.getStartDate().atStartOfDay() : null;
        LocalDateTime to = (filter.getEndDate() != null) ? filter.getEndDate().atTime(LocalTime.MAX) : null;

        String source = (filter.getSource() != null && !filter.getSource().isBlank()) ? filter.getSource() : null;
        String destination = (filter.getDestination() != null && !filter.getDestination().isBlank()) ? filter.getDestination() : null;

        return inventoryTransactionsRepository.findFilteredTransactions(from, to, source, destination);
    }

    public List<InventoryPurchaseDTO> getFilteredPurchases(InventoryPurchaseFilter filter) {
        LocalDateTime from = filter.getStartDate() != null ? filter.getStartDate().atStartOfDay() : null;
        LocalDateTime to = filter.getEndDate() != null ? filter.getEndDate().atTime(LocalTime.MAX) : null;

        return inventoryPurchaseRepository.findFilteredPurchases(
                filter.getProductId(),
                from,
                to
        );
    }

}


