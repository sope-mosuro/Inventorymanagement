package com.InventoryManager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Table(name = "inventory_transactions")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class InventoryTransactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime transactionDate;

    @Enumerated(EnumType.STRING)
    private TransactionType type; // PURCHASE, ASSIGNMENT, TRANSFER, SALE

    private int quantity;

    private String source; // e.g., "GlobalStock", "Warehouse-A", "SalesRep-Jane"
    private String destination; // e.g., "Warehouse-A", "SalesRep-Jane", null (for sales)

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;


    public InventoryTransactions(LocalDateTime now, TransactionType transactionType, int quantity, String source, String warehouseName, Product product) {
    }
}
