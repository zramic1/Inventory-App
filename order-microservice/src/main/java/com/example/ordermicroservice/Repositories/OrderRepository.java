package com.example.ordermicroservice.Repositories;

import com.example.ordermicroservice.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByid(Long id);
    boolean existsByid(Long id);
}
