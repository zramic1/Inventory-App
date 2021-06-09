package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Models.User;
import com.example.productmicroservice.Services.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns list of all Users in the system.")
    public List<User> all() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns a specific User by their identifier. 404 if does not exist.")
    public ResponseEntity getId(@PathVariable Long id) {
        return userService.getUserByID(id);
    }

    @PostMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creates a new User.")
    public ResponseEntity newUser(@Valid @RequestBody User newUser) {
        return userService.saveUser(newUser);
    }

    @DeleteMapping(value = "/deleteUser/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a User from the system. 404 if the user's identifier is not found.")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    @PutMapping(value = "/updateUser/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Updates User.")
    public ResponseEntity updateUser(@Valid @RequestBody User user, @PathVariable Long id) {
        return userService.updateUser(id, user);
    }

    @GetMapping(value = "/users/username/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns a specific User by their username. 404 if does not exist.")
    public ResponseEntity getByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping(value = "/supplier/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns Supplier of a specific User by their identifier. 404 if does not exist.")
    public ResponseEntity getSupplierByUserId(@PathVariable Long id) {
        return userService.getSupplierByUserId(id);
    }
}
