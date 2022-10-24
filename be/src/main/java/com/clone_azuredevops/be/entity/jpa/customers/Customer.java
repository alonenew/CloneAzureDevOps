package com.clone_azuredevops.be.entity.jpa.customers;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer {

    @Id 
    @Column(name = "cust_id" , nullable = false, length = 50)
    private String customerId;
    
    @Column(name = "email", nullable = false, length = 200)
    private String email;

    @Column(name = "password" , nullable = false, length = 1000)
    private String password;

    @Column(name = "first_name" , length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "created_date" )
    private Date createdDate;

}
