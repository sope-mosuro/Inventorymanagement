package com.InventoryManager.controller;


import com.InventoryManager.config.JwtUtil;
import com.InventoryManager.dto.PasswordRequest;
import com.InventoryManager.service.UserDetailsServiceImpl;
import com.InventoryManager.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserService userService;


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request, HttpServletResponse response) {
        String email = request.get("email");
        String password = request.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails);

        ResponseCookie cookie = ResponseCookie.from("JWT_TOKEN", token)
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(60 * 120) // 2 hour expiration
                .build();



        response.setHeader("Set-Cookie", cookie.toString());
        return Map.of("token", token);
    }
    @PostMapping("/logout")
    public Map<String, String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("JWT_TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately

        response.addCookie(cookie);

        return Map.of("message", "Logged out successfully");
    }

    @PostMapping("/changepassword")
    public ResponseEntity<String> changePassword(@RequestBody PasswordRequest request) {
        userService.changePassword(request);
        return ResponseEntity.ok("Password changed successfully");
    }
}
