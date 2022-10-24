package com.clone_azuredevops.be.entity.jpa.discussion;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "discussion")
public class Discussion {

    @Id 
    @Column(name = "discus_id" , nullable = false, length = 50)
    private String discusId;

    @Column(name = "cust_id" , nullable = false, length = 50)
    private String customerId;

    @Column(name = "task_id" , nullable = false, length = 50)
    private Integer taskId;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_date" , nullable = false)
    private Date createdDate;

    @Column(name = "created_by" , nullable = false, length = 50)
    private String createdBy;

    @Column(name = "update_date" , nullable = false)
    private Date updateDate;

    @Column(name = "update_by" , nullable = false, length = 50)
    private String updateBy;

    @ManyToOne // หลายรูป ต่อ 1 ประกาศ
    @JoinColumn(name = "task_id", insertable = false , updatable = false)
    @JsonBackReference
    private Task task;
    
}
