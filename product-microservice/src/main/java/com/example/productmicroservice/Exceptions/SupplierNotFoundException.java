package com.example.productmicroservice.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SupplierNotFoundException extends RuntimeException {

    public SupplierNotFoundException(Long id)
    {
        super("Supplier with id " + id + " does not exist");
    }
}
