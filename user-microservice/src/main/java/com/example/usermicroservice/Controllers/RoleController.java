package com.example.usermicroservice.Controllers;

import com.example.usermicroservice.Models.Role;
import com.example.usermicroservice.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping(value = "/roles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Role> all() {
        return roleService.getAllRoles();
    }


    @GetMapping(value = "/roles/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity id(@PathVariable Long id) {
        return roleService.getRoleByID(id);
    }

    @PostMapping(value = "/role", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity newRole(@Valid @RequestBody Role newRole) {
        return roleService.saveRole(newRole);
    }

    @DeleteMapping(value = "/deleteRole/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteRole(@PathVariable Long id) {
        return roleService.deleteRole(id);
    }

    @PutMapping(value = "/updateRole/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateRole(@Valid @PathVariable Long id, @RequestBody Role role) {
        return roleService.updateRole(id, role);
    }
}
