package com.example.ordermicroservice.Repositories;

import com.example.ordermicroservice.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByid(Long id);
    boolean existsByid(Long id);
}
