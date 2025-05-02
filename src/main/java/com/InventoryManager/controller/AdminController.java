package com.InventoryManager.controller;

import com.InventoryManager.dto.*;
import com.InventoryManager.model.User;
import com.InventoryManager.repository.UserRepository;
import com.InventoryManager.service.CustomerService;
import com.InventoryManager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor

public class AdminController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final CustomerService customerService;


    @PostMapping("/create-user")
    public ResponseEntity<UserRequest> createUser(@RequestBody UserRequest request) {
       UserRequest user = userService.createUser(request);
        return ResponseEntity.ok(user);
    }
    //only admin can get all sales reps
    @GetMapping("/sales-reps")
    public ResponseEntity<List<SalesRepDTO>> getAllSalesReps() {
        List<SalesRepDTO> salesReps = userService.getAllSalesReps();
        return ResponseEntity.ok(salesReps);
}


    @GetMapping("all-users")
    public ResponseEntity<List<AllUsersDTO>>getAllUsers(){
        List<AllUsersDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
