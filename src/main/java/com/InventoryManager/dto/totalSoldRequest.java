package com.InventoryManager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class totalSoldRequest {
    private int Id;
    private String productName;
    private int quantitySold;

    public totalSoldRequest(String name, Optional<Integer> totalSold) {
    }
}
