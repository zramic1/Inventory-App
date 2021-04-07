package com.example.productmicroservice.Models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name")
    @NotNull
    @NotEmpty(message = "Company name may not be empty")
    private String companyName;

    public Warehouse() { }

    public Warehouse(String companyName) {
        this.companyName = companyName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
