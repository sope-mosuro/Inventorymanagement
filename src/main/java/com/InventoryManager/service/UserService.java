package com.InventoryManager.service;

import com.InventoryManager.dto.SalesRepDTO;
import com.InventoryManager.model.Role;
import com.InventoryManager.model.User;
import com.InventoryManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<SalesRepDTO> getAllSalesReps() {
        List<User> salesReps = userRepository.findByRole(Role.SALES_REP);
        return salesReps.stream()
                .map(user -> new SalesRepDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }
}
