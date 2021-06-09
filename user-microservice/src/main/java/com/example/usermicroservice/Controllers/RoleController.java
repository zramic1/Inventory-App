package com.example.usermicroservice.Controllers;

import com.example.usermicroservice.Models.Role;
import com.example.usermicroservice.Services.RoleService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Roles in the system.")
    public List<Role> all() {
        return roleService.getAllRoles();
    }


    @GetMapping(value = "/roles/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns a specific Role by their identifier. 404 if does not exist.")
    public ResponseEntity id(@PathVariable Long id) {
        return roleService.getRoleByID(id);
    }

    @PostMapping(value = "/role", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creates a new Role.")
    public ResponseEntity newRole(@Valid @RequestBody Role newRole) {
        return roleService.saveRole(newRole);
    }

    @DeleteMapping(value = "/deleteRole/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Role from the system. 404 if the role's identifier is not found.")
    public ResponseEntity deleteRole(@PathVariable Long id) {
        return roleService.deleteRole(id);
    }

    @PutMapping(value = "/updateRole/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Updates Role.")
    public ResponseEntity updateRole(@Valid @PathVariable Long id, @RequestBody Role role) {
        return roleService.updateRole(id, role);
    }
}
