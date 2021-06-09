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

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "Warehouse_ID")
    private Warehouse warehouseID;

    /*@OneToMany(mappedBy = "userID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Supplier> suppliers;

    @JsonManagedReference(value="userIDFromSupplier")
    public List<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(List<Supplier> suppliers) {
        this.suppliers = suppliers;
    }*/

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "supplierID")
    private Supplier supplierID;

    @JsonBackReference(value="supplierIDFromUser")
    public Supplier getSupplierID() {
        return supplierID;
    }

    public void setSupplierID(Supplier supplierID) {
        this.supplierID = supplierID;
    }


    public User() { }

    public User(String firstName, String lastName, String username, Warehouse warehouseID,Supplier supplierID) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.username=username;
        this.warehouseID = warehouseID;
        this.supplierID=supplierID;
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

    @JsonBackReference(value="warehouseIDFromUser")
    public Warehouse getWarehouseID() {
        return warehouseID;
    }

    public void setWarehouseID(Warehouse warehouseID) {
        this.warehouseID = warehouseID;
    }
}
