package com.example.productmicroservice.Models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "First_name")
    @NotNull
    @NotEmpty(message = "First name may not be empty")
    private String first_name;

    @Column(name = "Last_name")
    @NotNull
    @NotEmpty(message = "Last name may not be empty")
    private String last_name;

    @Column(name = "Username", unique = true)
    @NotEmpty(message = "Username cannot be empty!")
    @Size(min = 1, max = 45, message = "Username must be between 1 and 45 characters long!")
    private String username;

    public User() { }

    public User(String firstName, String lastName, String username) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.username=username;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
