package com.example.productmicroservice.Repositories;

import com.example.productmicroservice.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByid(Long id);
    boolean existsByid(Long id);
}
