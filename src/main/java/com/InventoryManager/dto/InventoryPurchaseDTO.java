package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryPurchaseDTO {
    private Long productId;
    private String productName;
    private int quantity;
    private double costPrice;
    private LocalDateTime purchaseDate;
}
