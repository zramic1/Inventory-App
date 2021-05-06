package com.example.usermicroservice.Services;

import com.example.usermicroservice.ErrorHandling.AlreadyExistsException;
import com.example.usermicroservice.ErrorHandling.RecordNotFoundException;
import com.example.usermicroservice.Models.Customer;
import com.example.usermicroservice.Models.User;
import com.example.usermicroservice.Repositories.CustomerRepository;
import com.example.usermicroservice.Repositories.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public ResponseEntity getCustomerById(Long id) {
        if (customerRepository.existsByID(id)) {
            return new ResponseEntity(customerRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("Customer does not exist!");
        }
    }

    @Override
    public ResponseEntity saveCustomer(Customer customer) {
        if (!Long.toString(customer.getUserID().getID()).equals(Integer.toString(0))) {
            User user = userRepository.findByID(Long.valueOf(customer.getUserID().getID()));
            if (user == null) {
                throw new RecordNotFoundException("User does not exist!");
            } else {
                customer.setUserID(user);
            }
        }

        List<Customer> sviCustomeri = customerRepository.findAll();
        for (int i = 0; i < sviCustomeri.size(); i++) {
            Customer cus = sviCustomeri.get(i);
            if (cus.getEmail().equals(customer.getEmail())) {
                throw new AlreadyExistsException("Customer with same e-mail address already exists!");
            }
        }

        customerRepository.save(customer);

        return new ResponseEntity(customer, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity updateCustomer(Long id, Customer customer) {
        Customer kupac = customerRepository.findByID(id);
        if (customer == null || !customerRepository.existsByID(id)) {
            throw new RecordNotFoundException("Customer does not exist!");
        }

        List<Customer> sviCustomeri = customerRepository.findAll();
        for (int i = 0; i < sviCustomeri.size(); i++) {
            Customer cus = sviCustomeri.get(i);
            if (cus.getEmail().equals(customer.getEmail())) {
                throw new AlreadyExistsException("Customer with same e-mail address already exists!");
            }
        }

        if (!Long.toString(customer.getUserID().getID()).equals(Integer.toString(0))) {
            User user = userRepository.findByID(Long.valueOf(customer.getUserID().getID()));
            if (user == null) {
                throw new RecordNotFoundException("User does not exist!");
            } else {
                kupac.setUserID(user);
            }
        }

        if (!customer.getFirst_name().isEmpty()) {
            kupac.setFirst_name(customer.getFirst_name());
        }
        if (!customer.getLast_name().isEmpty()) {
            kupac.setLast_name(customer.getLast_name());
        }
        if (!customer.getAddress().isEmpty()) {
            kupac.setAddress(customer.getAddress());
        }
        if (!customer.getPhone().isEmpty()) {
            kupac.setPhone(customer.getPhone());
        }
        if (!customer.getEmail().isEmpty()) {
            kupac.setEmail(customer.getEmail());
        }
        if (customer.getUserID() != null) {
            kupac.setUserID(customer.getUserID());
        }

        customerRepository.save(kupac);

        return new ResponseEntity<>(kupac, HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteCustomer(Long id) {
        JSONObject objekat = new JSONObject();
        if (customerRepository.existsByID(id)) {
            customerRepository.deleteById(id);
            try {
                objekat.put("message", "Customer is successfully deleted!");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return new ResponseEntity(objekat.toString(), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("Customer does not exist!");
        }
    }
}
