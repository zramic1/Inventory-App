package com.example.productmicroservice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_price")
    @NotNull
    private Double unitPrice;

    @Column(name = "size")
    @NotNull
    private Integer size;

    @Column(name = "quantity")
    @NotNull
    private Integer quantity;

    @Column(name = "total")
    @NotNull
    private Double total;

    @Column(name = "date")
    @NotNull
    private Date date;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "product_id")
    private Product productId;

    public OrderDetail() { }

    public OrderDetail(Double unitPrice, Integer size, @NotEmpty(message = "Quantity may not be empty") Integer quantity, @NotEmpty(message = "Total may not be empty") Double total, @NotEmpty(message = "Date may not be empty") Date date, Product productId) {
        this.unitPrice = unitPrice;
        this.size = size;
        this.quantity = quantity;
        this.total = total;
        this.date = date;
        this.productId = productId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @JsonBackReference(value="productIDFromOrderDetails")
    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }
}
