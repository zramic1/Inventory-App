package com.example.ordermicroservice.Models;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.*;
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
    @NotEmpty(message = "Unit price may not be empty")
    private Double unitPrice;

    @Column(name = "size")
    @NotNull
    @NotEmpty(message = "Size may not be empty")
    private Integer size;

    @Column(name = "quantity")
    @NotNull
    @NotEmpty(message = "Quantity may not be empty")
    private Integer quantity;

    @Column(name = "total")
    @NotNull
    @NotEmpty(message = "Total may not be empty")
    private Double total;

    @Column(name = "date")
    @NotNull
    @NotEmpty(message = "Date may not be empty")
    private Date date;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "order_id")
    private Order orderId;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "payment_id")
    private Payment paymentId;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "product_id")
    private Product productId;

    public OrderDetail() { }

    public OrderDetail(@NotEmpty(message = "Unit price may not be empty") Double unitPrice, @NotEmpty(message = "Size may not be empty") Integer size, @NotEmpty(message = "Quantity may not be empty") Integer quantity, @NotEmpty(message = "Total may not be empty") Double total, @NotEmpty(message = "Date may not be empty") Date date, Order orderId, Payment paymentId, Product productId) {
        this.unitPrice = unitPrice;
        this.size = size;
        this.quantity = quantity;
        this.total = total;
        this.date = date;
        this.orderId = orderId;
        this.paymentId = paymentId;
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

    public Order getOrderId() {
        return orderId;
    }

    public void setOrderId(Order orderId) {
        this.orderId = orderId;
    }

    public Payment getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Payment paymentId) {
        this.paymentId = paymentId;
    }

    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }
}
