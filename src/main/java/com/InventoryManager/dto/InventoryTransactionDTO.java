package com.InventoryManager.dto;

import com.InventoryManager.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryTransactionDTO {
    private Long productId;
    private String productName;
    private LocalDateTime transactionDate;
    private int quantity;
    private TransactionType type;
    private String source;
    private String destination;


}
