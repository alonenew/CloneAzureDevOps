package com.clone_azuredevops.be.model.task;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequest {
    
    private Integer taskId;
    private String customerId;
    private String status;
    private String name;
    private String assign;
    private String description;
    private String acceptance;
    private Integer storyPoint;
    private Integer priority;
    private Integer risk;
    private Integer area;
    private String discussion;
    private String createdBy;
    
}
