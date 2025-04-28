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
public class SaleRequestDTO {
    private Long customerId;
    private boolean isWalkInCustomer;
    private PaymentMethod paymentMethod;
    private LocalDateTime saleDate;
    private List<SaleItemRequestDTO> items;
}
