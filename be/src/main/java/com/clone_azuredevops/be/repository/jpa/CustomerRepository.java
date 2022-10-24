package com.clone_azuredevops.be.repository.jpa;

import com.clone_azuredevops.be.entity.jpa.customers.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer , Integer> {
    Customer findByCustomerId(String customerId);
    Customer findByEmail(String email);
}
