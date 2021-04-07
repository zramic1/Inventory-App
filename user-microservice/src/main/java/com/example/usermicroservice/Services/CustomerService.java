package com.example.usermicroservice.Services;

import com.example.usermicroservice.Models.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomers();
}
