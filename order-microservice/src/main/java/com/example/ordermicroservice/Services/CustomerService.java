package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Models.Customer;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomers();

    ResponseEntity getCustomerById(Long id);

    ResponseEntity saveCustomer(Customer customer);

    ResponseEntity updateCustomer(Long id, Customer customer);

    ResponseEntity deleteCustomer(Long id);
}
