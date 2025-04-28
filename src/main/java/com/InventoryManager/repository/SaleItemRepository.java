package com.InventoryManager.repository;

import com.InventoryManager.model.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
    @Query("SELECT SUM(si.quantity) FROM SaleItem si WHERE si.product.id = :productId")
    Optional<Integer>totalQuantitySoldByProduct(@Param("productId") Long productId);

    @Query("SELECT SUM(si.totalCost) FROM SaleItem si WHERE si.product.id = :productId")
    Optional<Double>totalRevenueByProduct(@Param("productId") Long productId);
}
