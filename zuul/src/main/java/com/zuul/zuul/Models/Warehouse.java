package com.zuul.zuul.Models;

import java.util.Date;

public class Warehouse {

    private Long ID;
    private String companyName;
    private String location;
    private Date inventoryStartDate;

    public Warehouse(String companyName, String location, Date inventoryStartDate) {
        this.companyName = companyName;
        this.location = location;
        this.inventoryStartDate = inventoryStartDate;
    }

    public Warehouse() { }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getInventoryStartDate() {
        return inventoryStartDate;
    }

    public void setInventoryStartDate(Date inventoryStartDate) {
        this.inventoryStartDate = inventoryStartDate;
    }
}
