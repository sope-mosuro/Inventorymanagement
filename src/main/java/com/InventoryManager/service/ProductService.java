package com.InventoryManager.service;

import com.InventoryManager.dto.ProductDTO;
import com.InventoryManager.dto.UpdateProductPriceDTO;
import com.InventoryManager.dto.UpdateStockRequestDTO;
import com.InventoryManager.model.Product;
import com.InventoryManager.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;



    @Transactional
    public UpdateStockRequestDTO increaseStock(UpdateStockRequestDTO request) {
        Product product = productRepository.findByName(request.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Increase stock
        product.setStock(product.getStock() + request.getQuantity());



       productRepository.save(product);
        // Return DTO
        return new UpdateStockRequestDTO(product.getName(), product.getStock());

    }

    public ProductDTO createProduct(Product product){
         productRepository.save(product);
        return new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getStock());
    }



    public List<ProductDTO> getAllProducts(){
        return productRepository.findAll().stream()
                .map(product -> new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getStock()))
                .toList();

    }

    public UpdateProductPriceDTO UpdatePrice(UpdateProductPriceDTO request){
        Product product = productRepository.findByName(request.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setPrice(request.getPrice());
        productRepository.save(product);


       return new UpdateProductPriceDTO(product.getName(), product.getPrice());
    }
}
