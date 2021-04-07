package com.example.usermicroservice.Models;

import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="Roles")
public class Role {
    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ID;

    @Column(name="Role_name")
    @NotEmpty(message = "Role Name cannot be empty!")
    @Size(min=1, max=45,message = "Role Name must be between 1 and 45 characters long!")
    private String role_name;

    @Column(name="Description")
    @NotEmpty(message = "Description cannot be empty!")
    @Size(min=1, max=45,message = "Description must be between 1 and 45 characters long!")
    private String description;

    @OneToMany(mappedBy = "roleID",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<User> users;


}

