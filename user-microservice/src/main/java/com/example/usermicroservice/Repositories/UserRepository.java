package com.example.usermicroservice.Repositories;

import com.example.usermicroservice.Models.Role;
import com.example.usermicroservice.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByID(Long id);

    boolean existsByID(Long id);

    User findByUsername(String username);

    List<User> findByroleID(Role Role_id);

    boolean existsByUsername(String username);
}
