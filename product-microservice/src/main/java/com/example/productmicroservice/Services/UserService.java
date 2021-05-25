package com.example.productmicroservice.Services;

import com.example.productmicroservice.Models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    ResponseEntity getUserByID(Long id);

    ResponseEntity getUserByUsername(String username);

    ResponseEntity saveUser(User user);

    ResponseEntity updateUser(Long id, User user);

    ResponseEntity deleteUser(Long id);
}
