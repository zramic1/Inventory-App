package com.example.usermicroservice.Services;

import com.example.usermicroservice.Models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    ResponseEntity getUserByID(Long id);

    ResponseEntity getUserByUsername(String username);

    List<User> getUsersByRoleID(Long id);

    ResponseEntity saveUser(User user);

    ResponseEntity updateUser(Long id, User user);

    ResponseEntity deleteUser(Long id);
}
