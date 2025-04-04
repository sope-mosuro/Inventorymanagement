package com.InventoryManager.dto;

import com.InventoryManager.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleResponseDTO {
    private Long saleId;
    private double totalCost;
    private LocalDateTime saleDate;
    private PaymentMethod paymentMethod;
    private String salesRep;
    private String customer;
    private List<SaleItemDTO> saleItems;
}
