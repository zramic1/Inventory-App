package com.example.ordermicroservice.Repositories;

import com.example.ordermicroservice.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByID(Long id);

    boolean existsByID(Long id);
}
