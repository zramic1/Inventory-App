package com.example.usermicroservice.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Warehouses")
public class Warehouse {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "Company_name")
    @NotEmpty(message = "Company Name cannot be empty!")
    @Size(min = 1, max = 45, message = "Company Name must be between 1 and 45 characters long!")
    private String company_name;

    @Column(name = "Location")
    @NotEmpty(message = "Location cannot be empty!")
    @Size(min = 1, max = 45, message = "Location must be between 1 and 45 characters long!")
    private String location;

    @Column(name = "Inventory_start_date")
    @PastOrPresent(message = "The date should be in the past or present date!")
    private Date inventory_start_date;

    @OneToMany(mappedBy = "warehouseID", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    private List<User> users;

    public Warehouse() { }

    public Warehouse(String company_name, String location, Date inventory_start_date) {
        this.company_name = company_name;
        this.location = location;
        this.inventory_start_date = inventory_start_date;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getInventory_start_date() {
        return inventory_start_date;
    }

    public void setInventory_start_date(Date inventory_start_date) {
        this.inventory_start_date = inventory_start_date;
    }

    @JsonManagedReference(value="warehouseIDFromUser")
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}