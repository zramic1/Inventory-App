package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.UserNotFoundException;
import com.example.productmicroservice.Models.User;
import com.example.productmicroservice.Repositories.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity getUserByID(Long id) {
        if (userRepository.existsByID(id)) {
            return new ResponseEntity(userRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    @Override
    public ResponseEntity getUserByUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            return new ResponseEntity(userRepository.findByUsername(username), HttpStatus.OK);
        } else {
            throw new UserNotFoundException(username);
        }
    }

    @Override
    public ResponseEntity saveUser(User user) {
        JSONObject objekat = new JSONObject();
        userRepository.save(user);
        try {
            objekat.put("message", "User is successfully added!");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(user, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity updateUser(Long id, User user) {
        User korisnik = userRepository.findByID(id);
        JSONObject objekat = new JSONObject();
        if (korisnik == null || !userRepository.existsByID(id)) {
            throw new UserNotFoundException(id);
        }

        if (!user.getFirst_name().isEmpty()) {
            korisnik.setFirst_name(user.getFirst_name());
        }
        userRepository.save(korisnik);
        try {
            objekat.put("message", "User is successfully updated!");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(korisnik, HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteUser(Long id) {
        JSONObject objekat = new JSONObject();
        if (userRepository.existsByID(id)) {
            userRepository.deleteById(id);
            try {
                objekat.put("message", "User is successfully deleted!");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return new ResponseEntity(objekat.toString(), HttpStatus.OK);
        } else {
            throw new UserNotFoundException(id);
        }
    }
}
