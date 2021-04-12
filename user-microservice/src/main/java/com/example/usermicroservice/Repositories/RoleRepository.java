package com.example.usermicroservice.Repositories;

import com.example.usermicroservice.Models.Role;
import com.example.usermicroservice.Models.RoleNames;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByID(Long id);

    boolean existsByID(Long id);

    Role findByroleName(RoleNames Role_name);

    boolean existsByroleName(RoleNames Role_name);
}
