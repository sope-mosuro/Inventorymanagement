package com.InventoryManager.config;

import com.InventoryManager.model.Role;
import com.InventoryManager.model.User;
import com.InventoryManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@inventory.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@inventory.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.valueOf("ADMIN"));

            userRepository.save(admin);
            System.out.println("Admin user created!");
        }
    }
}
