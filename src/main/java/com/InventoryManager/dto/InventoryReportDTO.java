package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryReportDTO {
    private String productName;
    private int totalPurchased;
    private int totalSold;
    private int remainingStock;
    private double totalPurchaseCost;
    private double totalRevenue;
    private double cogs;
    private double grossProfit;
}
