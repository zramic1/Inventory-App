package com.example.ordermicroservice.Repositories;

import com.example.ordermicroservice.Models.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Supplier findByid(Long id);
    boolean existsByid(Long id);
}
