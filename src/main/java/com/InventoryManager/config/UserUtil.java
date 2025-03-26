package com.InventoryManager.config;

import com.InventoryManager.dto.UserResponse;
import com.InventoryManager.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserUtil {
    public static User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserResponse) {
            return ((UserResponse) authentication.getPrincipal()).getUser();
        }
        throw new UsernameNotFoundException("User not found in security context");
    }
}
