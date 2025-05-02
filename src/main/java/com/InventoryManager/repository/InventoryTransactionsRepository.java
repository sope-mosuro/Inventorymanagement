package com.InventoryManager.repository;

import com.InventoryManager.dto.InventoryTransactionDTO;
import com.InventoryManager.model.InventoryTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InventoryTransactionsRepository extends JpaRepository<InventoryTransactions, Long> {
    @Query("""
    SELECT new com.InventoryManager.dto.InventoryTransactionDTO(
        it.product.id,
        it.product.name,
        it.transactionDate,
        it.quantity,
        it.type,
        it.source,
        it.destination
    )
    FROM InventoryTransactions it
    WHERE (:startDate IS NULL OR it.transactionDate >= :startDate)
      AND (:endDate IS NULL OR it.transactionDate <= :endDate)
      AND (:source IS NULL OR LOWER(it.source) = LOWER(:source))
      AND (:destination IS NULL OR LOWER(it.destination) = LOWER(:destination))
""")
    List<InventoryTransactionDTO> findFilteredTransactions(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("source") String source,
            @Param("destination") String destination);
}
