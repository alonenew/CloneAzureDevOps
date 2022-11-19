package com.clone_azuredevops.be.model.task;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequest {
    
    private Integer taskId;
    private String customerId;
    private String name;
    
}
