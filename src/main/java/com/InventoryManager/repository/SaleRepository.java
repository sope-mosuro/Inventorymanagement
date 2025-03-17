package com.InventoryManager.repository;

import com.InventoryManager.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findBySalesRepId(Long salesRepId);
}
