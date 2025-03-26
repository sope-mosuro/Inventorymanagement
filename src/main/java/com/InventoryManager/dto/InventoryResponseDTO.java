package com.InventoryManager.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponseDTO {
    private Long id;
    private int quantity;
    private ProductDTO product;
    private String warehouseName;
    private int warehouseRemainingQuantity;

    public InventoryResponseDTO(Long id, int quantity, ProductDTO productDTO, String warehouseName) {
        this.id = id;
        this.quantity = quantity;
        this.product = productDTO;
        this.warehouseName = warehouseName;
    }
}
