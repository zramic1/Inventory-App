package com.example.productmicroservice.Repositories;

import com.example.productmicroservice.Models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    Warehouse findByID(Long id);

    boolean existsByID(Long id);
}
