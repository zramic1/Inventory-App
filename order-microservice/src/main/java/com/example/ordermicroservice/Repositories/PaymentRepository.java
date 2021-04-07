package com.example.ordermicroservice.Repositories;

import com.example.ordermicroservice.Models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
