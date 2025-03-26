package com.InventoryManager.controller;

import com.InventoryManager.dto.SalesRepDTO;
import com.InventoryManager.dto.UserRequest;
import com.InventoryManager.model.Role;
import com.InventoryManager.model.User;
import com.InventoryManager.repository.UserRepository;
import com.InventoryManager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("User with this email already exists.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole()); // Admin can set role (SALES_REP, etc.)

        userRepository.save(user);
        return ResponseEntity.ok("User created successfully.");
    }
    //only admin can get all sales reps
    @GetMapping("/sales-reps")
    public ResponseEntity<List<SalesRepDTO>> getAllSalesReps() {
        List<SalesRepDTO> salesReps = userService.getAllSalesReps();
        return ResponseEntity.ok(salesReps);
}
}
