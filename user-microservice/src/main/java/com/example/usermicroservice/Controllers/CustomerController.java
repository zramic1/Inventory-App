package com.example.usermicroservice.Controllers;

import com.example.usermicroservice.Models.Customer;
import com.example.usermicroservice.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(value = "/customers", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Customer> all() {
        return customerService.getAllCustomers();
    }

    @GetMapping(value = "/customers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getId(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping(value = "/customer", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity newCustomer(@Valid @RequestBody Customer newCustomer) {
        return customerService.saveCustomer(newCustomer);
    }

    @DeleteMapping(value = "/deleteCustomer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteCustomer(@PathVariable Long id) {
        return customerService.deleteCustomer(id);
    }

    @PutMapping(value = "/updateCustomer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateCustomer(@Valid @RequestBody Customer customer, @PathVariable Long id) {
        return customerService.updateCustomer(id, customer);
    }
}