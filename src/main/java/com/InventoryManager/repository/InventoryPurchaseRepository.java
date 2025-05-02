package com.InventoryManager.repository;

import com.InventoryManager.dto.InventoryPurchaseDTO;
import com.InventoryManager.model.InventoryPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Repository
public interface InventoryPurchaseRepository extends JpaRepository<InventoryPurchase, Long> {

    @Query("SELECT SUM(ip.quantity) FROM InventoryPurchase ip WHERE ip.product.id = :productId")
    Optional<Integer> totalQuantityByProduct(@Param("productId") Long productId);

    @Query("""
        SELECT new com.InventoryManager.dto.InventoryPurchaseDTO(
            ip.product.id,
            ip.product.name,
            ip.quantity,
            ip.costPrice,
            ip.purchaseDate
        )
        FROM InventoryPurchase ip
        WHERE (:productId IS NULL OR ip.product.id = :productId)
          AND (:startDate IS NULL OR ip.purchaseDate >= :startDate)
          AND (:endDate IS NULL OR ip.purchaseDate <= :endDate)
    """)
    List<InventoryPurchaseDTO> findFilteredPurchases(
            @Param("productId") Long productId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );





}
