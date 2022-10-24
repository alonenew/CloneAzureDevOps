package com.clone_azuredevops.be.model.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomerRegisterResponse {

    private String custId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

}
