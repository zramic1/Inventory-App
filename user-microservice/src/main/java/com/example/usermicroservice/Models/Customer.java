package com.example.usermicroservice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="Customers")
public class Customer {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "First_name")
    @NotEmpty(message = "First Name cannot be empty!")
    @Size(min = 1, max = 45, message = "First Name must be between 1 and 45 characters long!")
    private String first_name;

    @Column(name = "Last_mame")
    @NotEmpty(message = "Last Name cannot be empty!")
    @Size(min = 1, max = 45, message = "Last Name must be between 1 and 45 characters long!")
    private String last_name;

    @Column(name = "Address")
    @NotEmpty(message = "Address cannot be empty!")
    @Size(min = 1, max = 45, message = "Address must be between 1 and 45 characters long!")
    private String address;

    @Column(name = "Phone")
    @NotEmpty(message = "Phone cannot be empty!")
    @Size(min = 1, max = 45, message = "Phone must be between 1 and 45 characters long!")
    private String phone;

    @Column(name = "Email")
    @NotEmpty(message = "Email cannot be empty!")
    @Email
    private String email;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonBackReference(value="userIDFromCustomer")
    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    /*@Transient
    private int idUser;

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }*/

    public Customer() {
    }

    public Customer(String first_name, String last_name, String address, String phone, String email, User userID) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.userID = userID;
    }

    /*public Customer(String first_name, String last_name, String address, String phone, String email, int idUser) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.idUser = idUser;
    }*/

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserID")
    private User userID;



}
