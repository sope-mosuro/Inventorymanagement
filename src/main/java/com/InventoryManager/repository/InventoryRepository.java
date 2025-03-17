package com.InventoryManager.repository;

import com.InventoryManager.model.Inventory;
import com.InventoryManager.model.Product;
import com.InventoryManager.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByAssignedToId(Long userId);
    Optional<Inventory> findByProductAndWarehouse(Product product, Warehouse warehouse);
}
