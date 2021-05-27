package com.example.ordermicroservice.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
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

    @Column(name = "phone")
    @NotNull
    @NotEmpty(message = "Phone may not be empty")
    private String phone;

    @Column(name = "email")
    @NotNull
    @Email
    private String email;


    @OneToMany(mappedBy = "supplierId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Order> order;

    @JsonManagedReference(value="supplierIDFromOrder")
    public List<Order> getOrder() {
        return order;
    }

    public void setOrder(List<Order> order) {
        this.order = order;
    }

    public Supplier() { }

    public Supplier(String name, String phone, @Email String email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
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
}
