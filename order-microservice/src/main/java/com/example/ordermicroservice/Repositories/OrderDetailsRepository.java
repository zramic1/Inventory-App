package com.example.ordermicroservice.Repositories;

import com.example.ordermicroservice.Models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Long> {
}
