package com.clone_azuredevops.be.entity.jpa.task;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "task")
public class Task {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id" , nullable = false, length = 50)
    private Integer taskId;

    @Column(name = "cust_id" , nullable = false, length = 50)
    private String customerId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Column(name = "status" , nullable = false, length = 50)
    private String status;
    
    @Column(name = "type", nullable = false, length = 200)
    private String type;

    @Column(name = "assign", length = 50)
    private String assign;

    @Column(name = "description")
    private String description;

    @Column(name = "acceptance")
    private String acceptance;

    @Column(name = "story_point")
    private Integer storyPoint;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "risk")
    private Integer risk;

    @Column(name = "area")
    private Integer area;
    
    @Column(name = "created_date" , nullable = false)
    private Date createdDate;

    @Column(name = "created_by" , nullable = false, length = 50)
    private String createdBy;

    @Column(name = "update_date" , nullable = false)
    private Date updateDate;

    @Column(name = "update_by" , nullable = false, length = 50)
    private String updateBy;

    @OneToMany(mappedBy = "task", orphanRemoval = true, fetch = FetchType.EAGER) // 1 ประกาศ มีได้หลายรูป
    @Fetch(value = FetchMode.SELECT)
    private List<Discussion> discussions;
    
}
