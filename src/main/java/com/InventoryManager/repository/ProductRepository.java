package com.InventoryManager.repository;
import com.InventoryManager.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    @Query("SELECT p FROM Product p JOIN SaleItem si ON si.product.id = p.id " +
            "GROUP BY p.id, p.name, p.price, p.stock " +
            "ORDER BY SUM(si.quantity) DESC")
    List<Product> findBestSellingProducts();


}
