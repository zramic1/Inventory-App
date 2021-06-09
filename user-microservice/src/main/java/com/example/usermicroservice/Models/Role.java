package com.example.usermicroservice.Models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sun.istack.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="Roles")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Role {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "Role_name")
    @NotNull
    @Enumerated(EnumType.STRING)
    private RoleNames roleName;

    @Column(name = "Description")
    @NotEmpty(message = "Description cannot be empty!")
    @Size(min = 1, max = 45, message = "Description must be between 1 and 45 characters long!")
    private String description;

    @OneToMany(mappedBy = "roleID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> users;

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public RoleNames getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleNames roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonManagedReference(value="roleIDFromUser")
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Role() {
    }

    public Role(RoleNames roleName, String description) {
        //this.id = id;
        this.roleName = roleName;
        this.description = description;
    }
}

