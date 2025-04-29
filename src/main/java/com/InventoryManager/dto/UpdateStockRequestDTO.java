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
public class UpdateStockRequestDTO {
    private String productName;
    private int quantity;
    private double cost_price;
    private LocalDateTime purchaseDate;


    public UpdateStockRequestDTO(String productName, int quantity, Double costPrice) {
        this.productName=productName;
        this.quantity = quantity;
        this.cost_price = costPrice;
    }
}
