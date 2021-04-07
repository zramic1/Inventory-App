package com.example.productmicroservice.Repositories;

import com.example.productmicroservice.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
