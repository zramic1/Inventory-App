package com.example.usermicroservice.Models;

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
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ID;

    @Column(name="Company_name")
    @NotEmpty(message = "Company Name cannot be empty!")
    @Size(min=1, max=45,message = "Company Name must be between 1 and 45 characters long!")
    private String company_name;

    @Column(name="Location")
    @NotEmpty(message = "Location cannot be empty!")
    @Size(min=1, max=45,message = "Location must be between 1 and 45 characters long!")
    private String location;

    @Column(name = "Inventory_start_date")
    @PastOrPresent(message = "The date should be in the past or present date!")
    private Date inventory_start_date;

    @OneToMany(mappedBy = "warehouseID",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<User> users;
}
