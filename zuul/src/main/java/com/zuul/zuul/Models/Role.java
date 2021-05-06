package com.zuul.zuul.Models;

public class Role {

    private Long ID;
    private RoleNames roleName;
    private String description;

    public Role(RoleNames roleName, String description) {
        this.roleName = roleName;
        this.description = description;
    }

    public Role() { }

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
}
