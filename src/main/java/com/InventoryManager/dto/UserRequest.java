package com.InventoryManager.dto;

import com.InventoryManager.model.Role;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private Role role; // SALES_REP, etc.


}
