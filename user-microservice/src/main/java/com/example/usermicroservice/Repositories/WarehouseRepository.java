package com.example.usermicroservice.Repositories;

import com.example.usermicroservice.Models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
    Warehouse findByID(Long id);

    boolean existsByID(Long id);
}
