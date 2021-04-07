package com.example.usermicroservice.Repositories;

import com.example.usermicroservice.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByID(Long id);
    boolean existsByID(Long id);
}
