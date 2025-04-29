package com.InventoryManager.dto;

import com.InventoryManager.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryRequest {
    private Long productId;
    private Long warehouseId;
    private int quantity;
    private String productName;
    private String warehouseName;


}
