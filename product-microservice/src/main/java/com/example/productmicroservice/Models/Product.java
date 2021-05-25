package com.example.productmicroservice.Models;

import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotNull
    @NotEmpty(message = "Name may not be empty")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit")
    @NotNull
    private String unit;

    @Column(name = "price")
    @NotNull
    private Double price;

    @Column(name = "quantity")
    @NotNull
    private Integer quantity;

    @Column(name = "status")
    @NotNull
    @NotEmpty(message = "Status may not be empty")
    private String status;

    @Column(name = "order_details")
    @NotNull
    private String orderDetails;

    @Column(name="image_url")
    @NotNull
    private String imageUrl;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "warehouse_id")
    private Warehouse warehouseId;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "category_id")
    private Category categoryId;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name = "supplier_id")
    private Supplier supplierId;

    public Product() { }

    public Product(String name, String description, String unit, Double price, Integer quantity, String status, String orderDetails, String imageUrl, Warehouse warehouseId, Category categoryId, Supplier supplierId) {
        this.name = name;
        this.description = description;
        this.unit = unit;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
        this.orderDetails = orderDetails;
        this.imageUrl=imageUrl;
        this.warehouseId = warehouseId;
        this.categoryId = categoryId;
        this.supplierId = supplierId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(String orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Warehouse getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Warehouse warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    public Supplier getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Supplier supplierId) {
        this.supplierId = supplierId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
