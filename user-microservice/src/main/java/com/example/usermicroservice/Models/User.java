package com.example.usermicroservice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.util.List;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Entity
@Table(name="Users")
public class User {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "First_name")
    @NotEmpty(message = "First Name cannot be empty!")
    @Size(min = 1, max = 45, message = "First Name must be between 1 and 45 characters long!")
    private String first_name;

    @Column(name = "Last_name")
    @NotEmpty(message = "Last Name cannot be empty!")
    @Size(min = 1, max = 45, message = "Last Name must be between 1 and 45 characters long!")
    private String last_name;

    @Column(name = "Address")
    @NotEmpty(message = "Address cannot be empty!")
    @Size(min = 1, max = 45, message = "Address must be between 1 and 45 characters long!")
    private String address;

    @Column(name = "Phone")
    @NotEmpty(message = "Phone cannot be empty!")
    @Size(min = 1, max = 45, message = "Phone must be between 1 and 45 characters long!")
    private String phone;

    @Column(name = "Email")
    @NotEmpty(message = "Email cannot be empty!")
    @Email
    private String email;

    @Column(name = "Username", unique = true)
    @NotEmpty(message = "Username cannot be empty!")
    @Size(min = 1, max = 45, message = "Username must be between 1 and 45 characters long!")
    private String username;

    @Documented
    @Constraint(validatedBy = PasswordConstraintValidator.class)
    @Target({FIELD, ANNOTATION_TYPE})
    @Retention(RUNTIME)
    public @interface ValidPassword {

        String message() default "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol!";

        Class<?>[] groups() default {};

        Class<? extends Payload>[] payload() default {};
    }

    @Column(name = "Password")
    @NotEmpty(message = "Password cannot be empty!")
    @Size(min = 8, message = "Password must be at least 8 characters long!")
    @ValidPassword
    private String password;


    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "Role_ID")
    private Role roleID;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "Warehouse_ID")
    private Warehouse warehouseID;

    @OneToMany(mappedBy = "userID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Customer> customers;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonBackReference(value="roleIDFromUser")
    public Role getRoleID() {
        return roleID;
    }

    public void setRoleID(Role roleID) {
        this.roleID = roleID;
    }

    @JsonBackReference(value="warehouseIDFromUser")
    public Warehouse getWarehouseID() {
        return warehouseID;
    }

    public void setWarehouseID(Warehouse warehouseID) {
        this.warehouseID = warehouseID;
    }

    @JsonManagedReference(value="userIDFromCustomer")
    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

   /* @Transient
    private int idRole;

    public int getIdRole() {
        return idRole;
    }

    public void setIdRole(int idRole) {
        this.idRole = idRole;
    }

    @Transient
    private int idWarehouse;

    public int getIdWarehouse() {
        return idWarehouse;
    }

    public void setIdWarehouse(int idWarehouse) {
        this.idWarehouse = idWarehouse;
    }*/

    public User() { }

    public User(String first_name, String last_name, String address, String phone, String email, String username, String password, Role roleID, Warehouse warehouseID) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roleID = roleID;
        this.warehouseID = warehouseID;
    }

    /*public User(String first_name, String last_name, String address, String phone, String email, String username, String password, int idRole, int idWarehouse) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.username = username;
        this.password = password;
        this.idRole = idRole;
        this.idWarehouse = idWarehouse;
    }*/

}