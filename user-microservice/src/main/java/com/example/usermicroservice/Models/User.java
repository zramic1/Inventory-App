package com.example.usermicroservice.Models;

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
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long ID;

    @Column(name="First_name")
    @NotEmpty(message = "First Name cannot be empty!")
    @Size(min=1, max=45,message = "First Name must be between 1 and 45 characters long!")
    private String first_name;

    @Column(name="Last_name")
    @NotEmpty(message = "Last Name cannot be empty!")
    @Size(min=1, max=45,message = "Last Name must be between 1 and 45 characters long!")
    private String last_name;

    @Column(name="Address")
    @NotEmpty(message = "Address cannot be empty!")
    @Size(min=1, max=45,message = "Address must be between 1 and 45 characters long!")
    private String address;

    @Column(name="Phone")
    @NotEmpty(message = "Phone cannot be empty!")
    @Size(min=1, max=45,message = "Phone must be between 1 and 45 characters long!")
    private String phone;

    @Column(name="Email")
    @NotEmpty(message = "Email cannot be empty!")
    @Email
    private String email;

    @Column(name="Username", unique = true)
    @NotEmpty(message = "Username cannot be empty!")
    @Size(min=1, max=45,message = "Username must be between 1 and 45 characters long!")
    private String username;

    @Documented
    @Constraint(validatedBy = PasswordConstraintValidator.class)
    @Target({ FIELD, ANNOTATION_TYPE })
    @Retention(RUNTIME)
    public @interface ValidPassword {

        String message() default "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol!";

        Class<?>[] groups() default {};

        Class<? extends Payload>[] payload() default {};
    }

    @Column(name="Password")
    @NotEmpty(message = "Password cannot be empty!")
    @Size(min=8,message = "Password must be at least 8 characters long!")
    @ValidPassword
    private String password;


    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name="Role_ID")
    private Role roleID;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn (name="Warehouse_ID")
    private Warehouse warehouseID;

    @OneToMany(mappedBy = "userID",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Customer> customers;

}

