package com.example.productmicroservice.Services;

import com.example.productmicroservice.Models.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    List<Product> index();
    Product show(Long id);
    ResponseEntity<Product> store(Product product);
    Product update(Product product, Long id);
    ResponseEntity delete(Long id);
    List<Product> getProductsByWarehouseId(Long id);
    List<Product> getProductsByUserId(Long id);
    ResponseEntity getSupplierByProductId(Long id);
    ResponseEntity getWarehouseByProductId(Long id);
    ResponseEntity getCategoryByProductId(Long id);
}
