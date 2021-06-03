package com.example.usermicroservice.Services;

import com.example.usermicroservice.ErrorHandling.AlreadyExistsException;
import com.example.usermicroservice.ErrorHandling.RecordNotFoundException;
import com.example.usermicroservice.Models.Role;
import com.example.usermicroservice.Models.User;
import com.example.usermicroservice.Models.Warehouse;
import com.example.usermicroservice.Repositories.RoleRepository;
import com.example.usermicroservice.Repositories.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity getUserByID(Long id) {
        if (userRepository.existsByID(id)) {
            return new ResponseEntity(userRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("User does not exist!");
        }
    }

    @Override
    public ResponseEntity getUserByUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            return new ResponseEntity(userRepository.findByUsername(username), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("User does not exist!");
        }
    }

    @Override
    public List<User> getUsersByRoleID(Long id) {
        if (roleRepository.existsByID(id)) {
            Role uloga = roleRepository.findByID(id);
            List<User> korisnici = userRepository.findByroleID(uloga);
            return korisnici;
        } else {
            throw new RecordNotFoundException("User does not exist!");
        }
    }

    @Override
    public ResponseEntity saveUser(User user) {
        JSONObject objekat = new JSONObject();
        if (!Long.toString(user.getRoleID().getID()).equals(Integer.toString(0))) {
            Role uloga = roleRepository.findByID(Long.valueOf(user.getRoleID().getID()));
            if (uloga == null) {
                throw new RecordNotFoundException("Role does not exist!");
            } else {
                user.setRoleID(uloga);
            }
        }
        List<User> sviKorisnici = userRepository.findAll();
        for (int i = 0; i < sviKorisnici.size(); i++) {
            User korisnik = sviKorisnici.get(i);
            if (korisnik.getUsername().equals(user.getUsername())) {
                throw new AlreadyExistsException("User with same username already exists!");
            }
            if (korisnik.getEmail().equals(user.getEmail())) {
                throw new AlreadyExistsException("User with same e-mail address already exists!");
            }
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String sifra = user.getPassword();
        user.setPassword(passwordEncoder.encode(sifra));

        userRepository.save(user);
        try {
            objekat.put("message", "User is successfully added!");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // poziv za product mikroservis
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<User> request = new HttpEntity<>(user, headers);
        User user1 = restTemplate.postForObject("http://product/user", request, User.class);

        return new ResponseEntity(user, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity updateUser(Long id, User user) {
        User korisnik = userRepository.findByID(id);
        JSONObject objekat = new JSONObject();
        if (korisnik == null || !userRepository.existsByID(id)) {
            throw new RecordNotFoundException("User does not exist!");
        }

        List<User> sviKorisnici = userRepository.findAll();
        for (int i = 0; i < sviKorisnici.size(); i++) {
            User korisnik1 = sviKorisnici.get(i);
            if (!korisnik.getID().equals(korisnik1.getID()) && korisnik1.getUsername().equals(user.getUsername())) {
                throw new AlreadyExistsException("User with same username already exists!");
            }
            if (!korisnik.getID().equals(korisnik1.getID()) && korisnik1.getEmail().equals(user.getEmail())) {
                throw new AlreadyExistsException("User with same e-mail address already exists!");
            }
        }

        if (user.getRoleID() != null && !Long.toString(user.getRoleID().getID()).equals(Integer.toString(0))) {
            Role uloga = roleRepository.findByID(Long.valueOf(user.getRoleID().getID()));
            if (uloga == null) {
                throw new RecordNotFoundException("Role does not exist!");
            } else {
                korisnik.setRoleID(uloga);
            }
        }

        if (user.getRoleID() != null) {
            korisnik.setRoleID(user.getRoleID());
        }
        if (!user.getFirst_name().isEmpty()) {
            korisnik.setFirst_name(user.getFirst_name());
        }
        if (!user.getLast_name().isEmpty()) {
            korisnik.setLast_name(user.getLast_name());
        }
        if (!user.getAddress().isEmpty()) {
            korisnik.setAddress(user.getAddress());
        }
        if (!user.getPhone().isEmpty()) {
            korisnik.setPhone(user.getPhone());
        }
        if (!user.getUsername().isEmpty()) {
            korisnik.setUsername(user.getUsername());
        }
        if (!user.getPassword().isEmpty() && !user.getPassword().equals(korisnik.getPassword())) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String sifra = user.getPassword();
            korisnik.setPassword(passwordEncoder.encode(sifra));
        }
        if (!user.getEmail().isEmpty()) {
            korisnik.setEmail(user.getEmail());
        }

        userRepository.save(korisnik);


        try {
            objekat.put("message", "User is successfully updated!");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // poziv za product mikroservis
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<User> request=new HttpEntity<>(user,httpHeaders);
        restTemplate.put("http://product/updateUser/"+id.toString(),request);

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
            // poziv za product mikroservis
            restTemplate.delete("http://product/deleteUser/"+id.toString());
            return new ResponseEntity(objekat.toString(), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("User does not exist!");
        }
    }

    @Override
    public ResponseEntity getUserRoleByUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            Role role=userRepository.findByUsername(username).getRoleID();
            return new ResponseEntity(role, HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("User does not exist!");
        }
    }

    @Override
    public ResponseEntity getWarehouseByUserId(Long id) {
        if (userRepository.existsByID(id)) {
            Warehouse warehouse = userRepository.findByID(id).getWarehouseID();
            return new ResponseEntity(warehouse, HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("User does not exist!");
        }
    }
}
