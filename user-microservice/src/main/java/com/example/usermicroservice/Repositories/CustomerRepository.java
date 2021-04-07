package com.example.usermicroservice.Repositories;

import com.example.usermicroservice.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer findByID(Long id);
    boolean existsByID(Long id);
}
