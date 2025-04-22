package com.InventoryManager.repository;

import com.InventoryManager.dto.UserSalesProjection;
import com.InventoryManager.model.Role;
import com.InventoryManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByName(String name);
    List<User> findByRole(Role role);
    @Query("SELECT u.id AS id, u.name AS name, COUNT(s.id) AS totalSales FROM User u JOIN Sale s ON s.salesRep.id = u.id GROUP BY u.id,u.name ORDER BY totalSales DESC")
    List<UserSalesProjection> findBestSellingReps();

}
