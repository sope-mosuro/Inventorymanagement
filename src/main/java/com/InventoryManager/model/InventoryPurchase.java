package com.InventoryManager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Getter
@Table(name = "inventory_purchase")
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryPurchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private int quantity;

    private double costPrice;

    private LocalDateTime purchaseDate;
}
