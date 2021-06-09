package com.example.productmicroservice.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OrderDetailNotFoundException extends RuntimeException {
    public OrderDetailNotFoundException(Long id)
    {
        super("Order detail with id " + id + " does not exist");
    }
}
