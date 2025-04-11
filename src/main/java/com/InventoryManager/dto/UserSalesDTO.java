package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSalesDTO {
    private Long id;
    private String name;
    private double totalSales;
}
