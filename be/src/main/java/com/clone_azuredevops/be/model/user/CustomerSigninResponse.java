package com.clone_azuredevops.be.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerSigninResponse {
    
    private String customerId;
    private String token;
    private String email;
    private String Name;
    private String firstName;
    private String lastName;
}
