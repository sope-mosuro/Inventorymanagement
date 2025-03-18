package com.InventoryManager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryRequest {
    private Long productId;
    private Long warehouseId;
    private int quantity;
    private String productName;
    private String warehouseName;
}
