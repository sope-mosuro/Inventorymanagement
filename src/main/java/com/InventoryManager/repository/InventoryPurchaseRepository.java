package com.InventoryManager.repository;

import com.InventoryManager.model.InventoryPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface InventoryPurchaseRepository extends JpaRepository<InventoryPurchase, Long> {

    @Query("SELECT SUM(ip.quantity) FROM InventoryPurchase ip WHERE ip.product.id = :productId")
    Optional<Integer> totalQuantityByProduct(@Param("productId") Long productId);





}
