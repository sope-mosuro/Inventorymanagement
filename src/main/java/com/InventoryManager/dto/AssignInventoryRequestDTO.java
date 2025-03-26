package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignInventoryRequestDTO {
    private String productName;
    private String warehouseName;
    private String salesRepName;
    private int quantity;
    private ProductDTO product;


}
