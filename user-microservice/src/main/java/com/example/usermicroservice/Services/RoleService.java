package com.example.usermicroservice.Services;

import com.example.usermicroservice.Models.Role;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();

    ResponseEntity getRoleByID(Long id);

    ResponseEntity saveRole(Role role);

    ResponseEntity deleteRole(Long id);

    ResponseEntity updateRole(Long id, Role role);
}
