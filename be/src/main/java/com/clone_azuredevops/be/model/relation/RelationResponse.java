package com.clone_azuredevops.be.model.relation;

import java.util.Date;
import java.util.List;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationResponse {

    private String relationId;
    private Integer linkType;
    private Integer taskId;
    private Integer taskLink;
    private String comment;
    private Date createdDate;
    private String createdBy;
    private Date updateDate;
    private String updateBy;
}
