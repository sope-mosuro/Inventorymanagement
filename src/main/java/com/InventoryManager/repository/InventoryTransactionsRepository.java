package com.InventoryManager.repository;

import com.InventoryManager.model.InventoryTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryTransactionsRepository extends JpaRepository<InventoryTransactions, Long> {

}
