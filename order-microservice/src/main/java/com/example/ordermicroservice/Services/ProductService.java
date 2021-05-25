package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Models.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    List<Product> index();
    Product show(Long id);
    ResponseEntity<Product> store(Product product);
    Product update(Product product, Long id);
    ResponseEntity delete(Long id);
}
