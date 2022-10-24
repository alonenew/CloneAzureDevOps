package com.clone_azuredevops.be.model.common;

import java.util.Date;

import com.clone_azuredevops.be.constant.StatusCode;
import com.fasterxml.jackson.annotation.JsonInclude;

public class ErrorResponse<T> {
    
    private StatusResponse status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T errors;

    public ErrorResponse(){
        this.status = new StatusResponse(StatusCode.ERR_CODE_500, StatusCode.ERR_DESC_500, new Date());
    }

    public ErrorResponse(String code, String desc){
        this.status = new StatusResponse(code, desc, new Date());
    }

    public ErrorResponse(T errors){
        this.status = new StatusResponse(StatusCode.ERR_CODE_500, StatusCode.ERR_DESC_500, new Date());
        this.errors = errors;
    }

    public ErrorResponse(String code, String desc, T errors){
        this.status = new StatusResponse(code, desc, new Date());
        this.errors = errors;
    }

    public StatusResponse getStatus() {
        return status;
    }

    public void setStatus(StatusResponse status) {
        this.status = status;
    }

    public T getErrors() {
        return errors;
    }

    public void setErrors(T errors) {
        this.errors = errors;
    }

}
