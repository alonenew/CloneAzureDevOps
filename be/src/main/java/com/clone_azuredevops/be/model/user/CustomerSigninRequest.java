package com.clone_azuredevops.be.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerSigninRequest {

    private String email;
    private String password;
    private String customerId;
    private String firstName;
    private String lastName;
    
}
