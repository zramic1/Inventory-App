package com.example.ordermicroservice.Models;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_type")
    @NotNull
    @NotEmpty(message = "Payment type may not be empty")
    private String paymentType;

    @Column(name = "order_details")
    @NotNull
    @NotEmpty(message = "Order details may not be empty")
    private String orderDetails;


    public Payment() { }

    public Payment(@NotEmpty(message = "Payment type may not be empty") String paymentType, @NotEmpty(message = "Order details may not be empty") String orderDetails) {
        this.paymentType = paymentType;
        this.orderDetails = orderDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(String orderDetails) {
        this.orderDetails = orderDetails;
    }
}
