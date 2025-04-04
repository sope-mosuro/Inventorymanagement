package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleItemDTO {
    private String productName;
    private int quantity;
    private double pricePerUnit;
    private double totalCost;
}
