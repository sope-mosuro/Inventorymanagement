package com.InventoryManager.controller;

import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.dto.UpdateStockRequestDTO;
import com.InventoryManager.model.Product;
import com.InventoryManager.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PostMapping("/increase")
    public UpdateStockRequestDTO increaseStock(@RequestBody UpdateStockRequestDTO request){
        return productService.increaseStock(request);
    }

}
