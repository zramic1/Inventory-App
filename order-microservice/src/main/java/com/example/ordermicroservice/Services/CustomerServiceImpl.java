package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Exceptions.CustomerNotFoundException;
import com.example.ordermicroservice.Models.Customer;
import com.example.ordermicroservice.Repositories.CustomerRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public ResponseEntity getCustomerById(Long id) {
        if (customerRepository.existsByID(id)) {
            return new ResponseEntity(customerRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new CustomerNotFoundException(id);
        }
    }

    @Override
    public ResponseEntity saveCustomer(Customer customer) {
        customerRepository.save(customer);

        return new ResponseEntity(customer, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity updateCustomer(Long id, Customer customer) {
        Customer kupac = customerRepository.findByID(id);
        if (customer == null || !customerRepository.existsByID(id)) {
            throw new CustomerNotFoundException(id);
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
            throw new CustomerNotFoundException(id);
        }
    }
}
