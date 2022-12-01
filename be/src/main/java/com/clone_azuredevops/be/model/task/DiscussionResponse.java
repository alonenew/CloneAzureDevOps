package com.clone_azuredevops.be.model.task;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiscussionResponse {
    private String discusId;
    private String customerId;
    private Integer taskId;
    private String comment;
    private String name;
    private Date createdDate;
    private String createdBy;
    private Date updateDate;
    private String updateBy;
}
