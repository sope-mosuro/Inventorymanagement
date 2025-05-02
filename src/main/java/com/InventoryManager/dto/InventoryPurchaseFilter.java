package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryPurchaseFilter {
    private Long productId;
    private LocalDate startDate;
    private LocalDate endDate;
}
