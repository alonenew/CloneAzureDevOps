package com.clone_azuredevops.be.model.relation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationRequest {
    
    private String customerId;
    private Integer linkType;
    private Integer taskId;
    private Integer taskLink;
    private String comment;
    
}
