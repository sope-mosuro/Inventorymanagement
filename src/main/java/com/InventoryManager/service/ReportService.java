package com.InventoryManager.service;

import com.InventoryManager.dto.InventoryReportDTO;
import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.dto.totalSoldRequest;
import com.InventoryManager.model.Product;
import com.InventoryManager.repository.InventoryPurchaseRepository;
import com.InventoryManager.repository.ProductRepository;
import com.InventoryManager.repository.SaleItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

}


