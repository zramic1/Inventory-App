package com.example.ordermicroservice.Models;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_of_order")
    private Date dateOfOrder;

    @Column(name = "status")
    @NotNull
    @NotEmpty(message = "Status may not be empty")
    private String status;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "supplier_id")
    private Supplier supplierId;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "customer_id")
    private Customer customerId;

    public Order() { }


    public Order(Date dateOfOrder, @NotEmpty(message = "Status may not be empty") String status, Supplier supplierId, Customer customerId) {
        this.dateOfOrder = dateOfOrder;
        this.status = status;
        this.supplierId = supplierId;
        this.customerId = customerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateOfOrder() {
        return dateOfOrder;
    }

    public void setDateOfOrder(Date dateOfOrder) {
        this.dateOfOrder = dateOfOrder;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Supplier getUserId() {
        return supplierId;
    }

    public void setUserId(Supplier userId) {
        this.supplierId = userId;
    }

    public Customer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }
}
