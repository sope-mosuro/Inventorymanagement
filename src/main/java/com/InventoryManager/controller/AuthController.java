package com.InventoryManager.controller;


import com.InventoryManager.config.JwtUtil;
import com.InventoryManager.service.UserDetailsServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request, HttpServletResponse response) {
        String email = request.get("email");
        String password = request.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails);

        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Enable in production with HTTPS
        cookie.setPath("/"); // Accessible to all endpoints
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days expiration

        response.addCookie(cookie);

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
}
