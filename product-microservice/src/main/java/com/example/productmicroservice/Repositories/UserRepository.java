package com.example.productmicroservice.Repositories;

import com.example.productmicroservice.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByID(Long id);

    boolean existsByID(Long id);

    User findByUsername(String username);

    boolean existsByUsername(String username);
}
