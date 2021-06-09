package com.example.productmicroservice.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id)
    {
        super("User with id " + id + " does not exist");
    }
    public UserNotFoundException(String s){super("User with username "+s+"does not exist");}
}
