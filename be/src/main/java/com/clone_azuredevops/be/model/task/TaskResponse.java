package com.clone_azuredevops.be.model.task;

import java.util.Date;
import java.util.List;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.clone_azuredevops.be.entity.jpa.relation.Relation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskResponse {

    private List<Discussion> discussion;
    private List<Relation> relations;
    private Integer taskId;
    private String customerId;
    private String name;
    private String status;
    private String type;
    private String assign;
    private Integer priority;
    private Integer storyPoint;
    private Integer risk;
    private Integer area;
    private String description;
    private String acceptance;
    private Date createdDate;
    private String createdBy;
    private Date updateDate;
    private String updateBy;
}
