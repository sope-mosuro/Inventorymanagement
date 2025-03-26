package com.InventoryManager.repository;

import com.InventoryManager.model.Inventory;
import com.InventoryManager.model.Product;
import com.InventoryManager.model.User;
import com.InventoryManager.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    @Query("SELECT i FROM Inventory i WHERE i.assignedTo.id = :salesRepId")
    List<Inventory> findByAssignedToId(@Param("salesRepId") Long salesRepId);
    Optional<Inventory> findByProductAndWarehouse(Product product, Warehouse warehouse);
    Optional<Inventory> findByProductAndAssignedTo(Product product, User salesRep);
    // Fetch inventory stored in a specific warehouse
    @Query("SELECT i FROM Inventory i WHERE i.warehouse.id = :warehouseId")
    List<Inventory> findByWarehouseId(@Param("warehouseId") Long warehouseId);
}
