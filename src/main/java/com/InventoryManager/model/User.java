package com.InventoryManager.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN or SALES_REP

    @OneToMany(mappedBy = "salesRep")
    private Set<Sale> sales;

    @OneToMany(mappedBy = "assignedTo")
    private Set<Inventory> assignedInventory;
}
