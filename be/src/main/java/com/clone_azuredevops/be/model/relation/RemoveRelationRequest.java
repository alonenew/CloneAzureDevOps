package com.clone_azuredevops.be.model.relation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemoveRelationRequest {
    
    private Integer taskId;
    private Integer taskLink;
    
}
