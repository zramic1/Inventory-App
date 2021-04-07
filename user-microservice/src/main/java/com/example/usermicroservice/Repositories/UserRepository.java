package com.example.usermicroservice.Repositories;

import com.example.usermicroservice.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByID(Long id);
    boolean existsByID(Long id);
}
