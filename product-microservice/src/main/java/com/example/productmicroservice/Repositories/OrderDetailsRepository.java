package com.example.productmicroservice.Repositories;

import com.example.productmicroservice.Models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Long> {
    OrderDetail findByid(Long id);
    boolean existsByid(Long id);
}
