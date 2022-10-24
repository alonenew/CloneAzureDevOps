package com.clone_azuredevops.be.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerRegisterRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    
}
