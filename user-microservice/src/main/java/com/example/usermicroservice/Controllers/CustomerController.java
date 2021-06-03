package com.example.usermicroservice.Controllers;

import com.example.usermicroservice.Models.Customer;
import com.example.usermicroservice.Services.CustomerService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Customers in the system.")
    public List<Customer> all() {
        return customerService.getAllCustomers();
    }

    @GetMapping(value = "/customers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns a specific Customer by their identifier. 404 if does not exist.")
    public ResponseEntity getId(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping(value = "/customer", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creates a new Customer.")
    public ResponseEntity newCustomer(@Valid @RequestBody Customer newCustomer) {
        return customerService.saveCustomer(newCustomer);
    }

    @DeleteMapping(value = "/deleteCustomer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Customer from the system. 404 if the customer's identifier is not found.")
    public ResponseEntity deleteCustomer(@PathVariable Long id) {
        return customerService.deleteCustomer(id);
    }

    @PutMapping(value = "/updateCustomer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Updates Customer.")
    public ResponseEntity updateCustomer(@Valid @RequestBody Customer customer, @PathVariable Long id) {
        return customerService.updateCustomer(id, customer);
    }

    @GetMapping(value = "/user/customer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns User of a specific Customer by their identifier. 404 if does not exist.")
    public ResponseEntity getUserByCustomerId(@PathVariable Long id) {
        return customerService.getUserByCustomerId(id);
    }
}