package com.clone_azuredevops.be.service.task;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.validation.constraints.Null;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.clone_azuredevops.be.model.task.DiscussionRequest;
import com.clone_azuredevops.be.model.task.DiscussionResponse;
import com.clone_azuredevops.be.model.task.TaskRequest;
import com.clone_azuredevops.be.model.task.TaskResponse;
import com.clone_azuredevops.be.repository.jpa.DiscussionRepository;
import com.clone_azuredevops.be.repository.jpa.TaskRepository;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    DiscussionRepository discussionRepository;

    public TaskResponse addTask(TaskRequest taskRequest) {
        Task task = new Task();
        Date date = new Date();

        task.setCustomerId(taskRequest.getCustomerId());
        task.setName(taskRequest.getName());
        task.setStatus("New");
        task.setType("User Story");
        task.setPriority(2);
        task.setArea(1);
        task.setCreatedBy(taskRequest.getCustomerId());
        task.setUpdateBy(taskRequest.getCustomerId());
        task.setCreatedDate(date);
        task.setUpdateDate(date);
        taskRepository.save(task);
        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setTaskId(task.getTaskId());
        taskResponse.setCustomerId(task.getCustomerId());
        taskResponse.setName(task.getName());
        taskResponse.setStatus(task.getStatus());
        taskResponse.setCreatedBy(task.getCreatedBy());
        taskResponse.setUpdateBy(task.getUpdateBy());
        taskResponse.setCreatedDate(task.getCreatedDate());
        taskResponse.setUpdateDate(task.getUpdateDate());
        return taskResponse;
    }

    public TaskResponse addDetail(TaskRequest taskRequest) {
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        Discussion discussion = new Discussion();
        UUID uuid = UUID.randomUUID();
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        task.setName(taskRequest.getName());
        task.setStatus(taskRequest.getStatus());
        task.setDescription(taskRequest.getDescription());
        task.setAcceptance(taskRequest.getAcceptance());
        task.setStoryPoint(taskRequest.getStoryPoint());
        task.setAssign(taskRequest.getAssign());
        task.setPriority(taskRequest.getPriority());
        task.setRisk(taskRequest.getRisk());
        task.setArea(taskRequest.getArea());
        task.setUpdateBy(taskRequest.getCustomerId());
        task.setUpdateDate(date);

        if (taskRequest.getDiscussion() != null && !taskRequest.getDiscussion().isEmpty()) {
            discussion.setDiscusId(dateFormat.format(date) + uuid.toString());
            discussion.setCustomerId(taskRequest.getCustomerId());
            discussion.setTaskId(task.getTaskId());
            discussion.setComment(taskRequest.getDiscussion());
            discussion.setCreatedBy(taskRequest.getCreatedBy());
            discussion.setUpdateBy(taskRequest.getCustomerId());
            discussion.setCreatedDate(date);
            discussion.setUpdateDate(date);
            discussionRepository.save(discussion);
        }

        taskRepository.save(task);
        
        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setTaskId(task.getTaskId());
        taskResponse.setCustomerId(task.getCustomerId());
        taskResponse.setName(task.getName());
        taskResponse.setStatus(task.getStatus());
        taskResponse.setType("User Story");
        taskResponse.setDescription(task.getDescription());
        taskResponse.setAcceptance(task.getAcceptance());
        taskResponse.setStoryPoint(task.getStoryPoint());
        taskResponse.setPriority(task.getPriority());
        taskResponse.setRisk(task.getRisk());
        taskResponse.setArea(task.getArea());
        taskResponse.setCreatedBy(task.getCreatedBy());
        taskResponse.setUpdateBy(task.getUpdateBy());
        taskResponse.setCreatedDate(task.getCreatedDate());
        taskResponse.setUpdateDate(task.getUpdateDate());
        return taskResponse;
    }

    public List<Task> getTask() {
    return taskRepository.findAll();
    }

    public TaskResponse getTaskById(TaskRequest taskRequest) {
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        TaskResponse  taskResponse = new TaskResponse();
        taskResponse.setTaskId(task.getTaskId());
        taskResponse.setCustomerId(task.getCustomerId());
        taskResponse.setName(task.getName());
        taskResponse.setType(task.getType());
        taskResponse.setStatus(task.getStatus());
        taskResponse.setStoryPoint(task.getStoryPoint());
        taskResponse.setPriority(task.getPriority());
        taskResponse.setRisk(task.getRisk());
        taskResponse.setAssign(task.getAssign());
        taskResponse.setArea(task.getArea());
        taskResponse.setDescription(task.getDescription());
        taskResponse.setAcceptance(task.getAcceptance());
        taskResponse.setCreatedBy(task.getCreatedBy());
        taskResponse.setUpdateBy(task.getUpdateBy());
        taskResponse.setCreatedDate(task.getCreatedDate());
        taskResponse.setUpdateDate(task.getUpdateDate());

        List<Discussion> discussionList = discussionRepository.findByTaskIdOrderByCreatedDateDesc(task.getTaskId());
        taskResponse.setDiscussion(discussionList);   
        return taskResponse;
    }
    
    public TaskResponse updateAssign(TaskRequest taskRequest) {
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        Date date = new Date();
        task.setAssign(taskRequest.getAssign());
        task.setUpdateBy(taskRequest.getCustomerId());
        task.setUpdateDate(date);
        taskRepository.save(task);
        TaskResponse  taskResponse = new TaskResponse();
        taskResponse.setTaskId(task.getTaskId());
        taskResponse.setCustomerId(task.getCustomerId());
        taskResponse.setName(task.getName());
        taskResponse.setType(task.getType());
        taskResponse.setStatus(task.getStatus());
        taskResponse.setStoryPoint(task.getStoryPoint());
        taskResponse.setPriority(task.getPriority());
        taskResponse.setRisk(task.getRisk());
        taskResponse.setAssign(task.getAssign());
        taskResponse.setArea(task.getArea());
        taskResponse.setDescription(task.getDescription());
        taskResponse.setAcceptance(task.getAcceptance());
        taskResponse.setCreatedBy(task.getCreatedBy());
        taskResponse.setUpdateBy(task.getUpdateBy());
        taskResponse.setCreatedDate(task.getCreatedDate());
        taskResponse.setUpdateDate(task.getUpdateDate());

        List<Discussion> discussionList = discussionRepository.findByTaskIdOrderByCreatedDateDesc(task.getTaskId());
        taskResponse.setDiscussion(discussionList);   
        return taskResponse;
    }

    public void remove(TaskRequest taskRequest){
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        taskRepository.delete(task);
    }

    public TaskResponse update(TaskRequest taskRequest) {
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        Date date = new Date();
        task.setCustomerId(taskRequest.getCustomerId());
        task.setStatus(taskRequest.getStatus());
        task.setUpdateBy(taskRequest.getCustomerId());
        task.setUpdateDate(date);
        taskRepository.save(task);

        TaskResponse taskResponse = new TaskResponse();
        taskResponse.setTaskId(task.getTaskId());
        taskResponse.setCustomerId(task.getCustomerId());
        taskResponse.setName(task.getName());
        taskResponse.setStatus(task.getStatus());
        taskResponse.setCreatedBy(task.getCreatedBy());
        taskResponse.setUpdateBy(task.getUpdateBy());
        taskResponse.setCreatedDate(task.getCreatedDate());
        taskResponse.setUpdateDate(task.getUpdateDate());
        return taskResponse;
    }

    public Discussion removeDiscusById(DiscussionRequest discussionRequest) {
        Discussion delete = discussionRepository.findByDiscusId(discussionRequest.getDiscusId());
        discussionRepository.delete(delete);
        return delete;
    }

    public List<Discussion> getDiscus(TaskRequest taskRequest) {
        List<Discussion> discussionList = discussionRepository.findByTaskIdOrderByCreatedDateDesc(taskRequest.getTaskId());
        return discussionList;
    }

    public Discussion updateDiscusById(DiscussionRequest discussionRequest) {
        Discussion discus = discussionRepository.findByDiscusId(discussionRequest.getDiscusId());
        Date date = new Date();
        discus.setComment(discussionRequest.getComment());
        discus.setUpdateDate(date);
        return discussionRepository.save(discus);
    }


}
