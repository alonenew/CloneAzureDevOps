package com.clone_azuredevops.be.entity.jpa.relation;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.FetchMode;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Fetch;

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

    @Column(name = "task_id" , nullable = false, length = 50)
    private Integer taskId;

    
    
    @Column(name = "created_date" , nullable = false)
    private Date createdDate;

    @Column(name = "created_by" , nullable = false, length = 50)
    private String createdBy;

    @Column(name = "update_date" , nullable = false)
    private Date updateDate;

    @Column(name = "update_by" , nullable = false, length = 50)
    private String updateBy;
    
}
