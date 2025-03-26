package com.InventoryManager.repository;

import com.InventoryManager.model.Role;
import com.InventoryManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByName(String name);
    List<User> findByRole(Role role);

}
