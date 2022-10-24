package com.clone_azuredevops.be.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clone_azuredevops.be.entity.jpa.task.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{

    Task findByTaskId(Integer taskId);
    List<Task> findByCustomerId(String custId);
    Task deleteByTaskId(Integer taskId);
}
