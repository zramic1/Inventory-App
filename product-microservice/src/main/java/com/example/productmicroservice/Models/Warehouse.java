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
    private Long ID;

    @Column(name = "Company_name")
    @NotNull
    @NotEmpty(message = "Company name may not be empty")
    private String company_name;

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
