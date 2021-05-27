package com.example.productmicroservice.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "Company_name")
    @NotNull
    @NotEmpty(message = "Company name may not be empty")
    private String company_name;

    @OneToMany(mappedBy = "warehouseId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Product> products;

    @JsonManagedReference(value="warehouseIdFromProduct")
    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @OneToMany(mappedBy = "warehouseID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> users;

    @JsonManagedReference(value="warehouseIDFromUser")
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Warehouse() { }

    public Warehouse(String companyName) {
        this.company_name = companyName;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }
}
