package com.example.usermicroservice.Services;

import com.example.usermicroservice.Models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
}
