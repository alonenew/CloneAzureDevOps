package com.clone_azuredevops.be.entity.jpa.relation;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@JsonIgnoreProperties("discussion")
@Table(name = "relation")
public class Relation {

    @Id 
    @Column(name = "relation_id" , nullable = false, length = 50)
    private String relationId;

    @Column(name = "link_type" , nullable = false)
    private Integer linkType;

    @Column(name = "task_id" , nullable = false, length = 50)
    private Integer taskId;

    @Column(name = "task_link" , nullable = false, length = 50)
    private Integer taskLink;

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
