package com.clone_azuredevops.be.model.common;

import java.util.Date;

import com.clone_azuredevops.be.constant.StatusCode;
import com.fasterxml.jackson.annotation.JsonInclude;

public class SuccessResponse<T> {

    private StatusResponse status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public SuccessResponse(){
        this.status = new StatusResponse(StatusCode.SUC_CODE_200, StatusCode.SUC_DESC_200, new Date());
    }

    public SuccessResponse(T data){
        this.status = new StatusResponse(StatusCode.SUC_CODE_200, StatusCode.SUC_DESC_200, new Date());
        this.data = data;
    }

    public SuccessResponse(String code, String desc, T data){
        this.status = new StatusResponse(code, desc, new Date());
        this.data = data;
    }

    public SuccessResponse(String register) {
    }

    public StatusResponse getStatus() {
        return status;
    }

    public void setStatus(StatusResponse status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
    
}