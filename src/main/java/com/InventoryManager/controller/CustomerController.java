package com.InventoryManager.controller;

import com.InventoryManager.dto.CustomerRequestDTO;
import com.InventoryManager.dto.CustomerResponseDTO;
import com.InventoryManager.model.Customer;
import com.InventoryManager.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;


    @PostMapping("/create-customer")
    public ResponseEntity<Customer> createCustomer(@RequestBody CustomerRequestDTO customerRequestDTO) {
        Customer customer = customerService.createCustomer(
                customerRequestDTO.getName(),
                customerRequestDTO.getPhoneNumber(),
                customerRequestDTO.getEmail()
        );
        return ResponseEntity.ok(customer);
    }
    @GetMapping("/all-customers")
    public ResponseEntity<Collection<CustomerResponseDTO>> getAllCustomers() {
        Collection<CustomerResponseDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }


}
