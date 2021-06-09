package com.example.productmicroservice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotNull
    @NotEmpty(message = "Name may not be empty")
    private String name;

    @Column(name = "address")
    @NotNull
    @NotEmpty(message = "Address may not be empty")
    private String address;

    @Column(name = "phone")
    @NotNull
    @NotEmpty(message = "Phone may not be empty")
    private String phone;

    @Column(name = "fax")
    @NotNull
    @NotEmpty(message = "Fax may not be empty")
    private String fax;

    @Column(name = "email")
    @NotNull
    @Email
    private String email;

    @Column(name = "other_details")
    private String otherDetails;

    /*@ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserID")
    private User userID;

    @JsonBackReference(value="userIDFromSupplier")
    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }
    */

    @OneToMany(mappedBy = "supplierID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> users;

    @JsonManagedReference(value="supplierIDFromUser")
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Supplier() { }

    public Supplier(String name, String address, String phone, String fax, @Email String email, String otherDetails) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.fax = fax;
        this.email = email;
        this.otherDetails = otherDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtherDetails() {
        return otherDetails;
    }

    public void setOtherDetails(String otherDetails) {
        this.otherDetails = otherDetails;
    }


}
