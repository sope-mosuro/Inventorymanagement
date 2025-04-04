package com.InventoryManager.service;

import com.InventoryManager.dto.CustomerResponseDTO;
import com.InventoryManager.model.Customer;
import com.InventoryManager.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer createCustomer(String name, String phoneNumber, String email) {
        if(customerRepository.existsByEmail(email)
        || customerRepository.findByName(name).isPresent()) {
            throw new IllegalArgumentException("Customer with this email or name already exists");
        }
        Customer customer = new Customer();
        customer.setName(name);
        customer.setPhoneNumber(phoneNumber);
        customer.setEmail(email);
        return customerRepository.save(customer);
    }
    public Customer getOrCreateWalkInCustomer() {
        return customerRepository.findByName("walk-in customer")
                .orElseGet(() -> createCustomer("walk-in customer", "", ""));
    }
    public Collection<CustomerResponseDTO> getAllCustomers() {
        List<Customer> customers=customerRepository.findAll();
               return customers.stream()
                        .map(customer -> new CustomerResponseDTO(customer.getId(), customer.getName(), customer.getPhoneNumber(), customer.getEmail()))
                .collect(Collectors.toList());
    }
}
