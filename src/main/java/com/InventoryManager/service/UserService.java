package com.InventoryManager.service;

import com.InventoryManager.config.UserUtil;
import com.InventoryManager.dto.AllUsersDTO;
import com.InventoryManager.dto.PasswordRequest;
import com.InventoryManager.dto.SalesRepDTO;
import com.InventoryManager.dto.UserRequest;
import com.InventoryManager.model.Role;
import com.InventoryManager.model.User;
import com.InventoryManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<SalesRepDTO> getAllSalesReps() {
        List<User> salesReps = userRepository.findByRole(Role.SALES_REP);
        return salesReps.stream()
                .map(user -> new SalesRepDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public List<AllUsersDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user-> new AllUsersDTO(user.getName(),
                        user.getEmail(),
                        user.getRole().name()))
                .collect(Collectors.toList());
    }

    public UserRequest createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw (new RuntimeException("User with this email already exists."));
        }
        User user = new User();
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setRole(request.getRole());
        userRepository.save(user);
        return new UserRequest(user.getName(), user.getEmail(), user.getPassword(), user.getRole());



    }

    public void changePassword(PasswordRequest request){
        User user = UserUtil.getLoggedInUser();
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}

