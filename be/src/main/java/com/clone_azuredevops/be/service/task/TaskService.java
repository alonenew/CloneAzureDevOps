package com.clone_azuredevops.be.service.task;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.clone_azuredevops.be.constant.StatusCode;
import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.clone_azuredevops.be.entity.jpa.relation.Relation;
import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.clone_azuredevops.be.exception.BaseException;
import com.clone_azuredevops.be.model.task.AddDetailRequest;
import com.clone_azuredevops.be.model.task.DiscussionRequest;
import com.clone_azuredevops.be.model.task.TaskRequest;
import com.clone_azuredevops.be.model.task.TaskResponse;
import com.clone_azuredevops.be.repository.jpa.DiscussionRepository;
import com.clone_azuredevops.be.repository.jpa.RelationRepository;
import com.clone_azuredevops.be.repository.jpa.TaskRepository;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    DiscussionRepository discussionRepository;

    @Autowired
    RelationRepository relationRepository;

    public TaskResponse addTask(TaskRequest taskRequest) {
        Task task = new Task();
        Date date = new Date();
        if (taskRequest.getName().length()>50 || taskRequest.getName().isEmpty() || taskRequest.getCustomerId().isEmpty())  {
            throw new BaseException(HttpStatus.BAD_REQUEST, StatusCode.ERR_CODE_400, StatusCode.ERR_DESC_400);
        }
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

    public TaskResponse addDetail(AddDetailRequest addDetailRequest) {
        Task task = taskRepository.findByTaskId(addDetailRequest.getTaskId());
        Discussion discussion = new Discussion();
        UUID uuid = UUID.randomUUID();
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        task.setName(addDetailRequest.getName());
        task.setStatus(addDetailRequest.getStatus());
        task.setDescription(addDetailRequest.getDescription());
        task.setAcceptance(addDetailRequest.getAcceptance());
        task.setStoryPoint(addDetailRequest.getStoryPoint());
        task.setAssign(addDetailRequest.getAssign());
        task.setPriority(addDetailRequest.getPriority());
        task.setRisk(addDetailRequest.getRisk());
        task.setArea(addDetailRequest.getArea());
        task.setUpdateBy(addDetailRequest.getCustomerId());
        task.setUpdateDate(date);

        if (addDetailRequest.getDiscussion() != null && !addDetailRequest.getDiscussion().isEmpty()) {
            discussion.setDiscusId(dateFormat.format(date) + uuid.toString());
            discussion.setCustomerId(addDetailRequest.getCustomerId());
            discussion.setTaskId(task.getTaskId());
            discussion.setComment(addDetailRequest.getDiscussion());
            discussion.setCreatedBy(addDetailRequest.getCreatedBy());
            discussion.setUpdateBy(addDetailRequest.getCustomerId());
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
        List<Relation> relationList = relationRepository.findAllByTaskId(task.getTaskId());
        taskResponse.setDiscussion(discussionList);   
        taskResponse.setRelations(relationList);   
        return taskResponse;
    }
    
    public TaskResponse updateAssign(AddDetailRequest taskRequest) {
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

    public Boolean remove(TaskRequest taskRequest){
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        if(task != null){
            taskRepository.delete(task);
            return true;
        }else{
            return false;
        }
    }

    public TaskResponse update(AddDetailRequest taskRequest) {
        Task task = taskRepository.findByTaskId(taskRequest.getTaskId());
        Date date = new Date();
        TaskResponse taskResponse = new TaskResponse();
        if (!taskRequest.getStatus().equals(task.getStatus())) {
            task.setCustomerId(taskRequest.getCustomerId());
            task.setStatus(taskRequest.getStatus());
            task.setUpdateBy(taskRequest.getCustomerId());
            task.setUpdateDate(date);
            taskRepository.save(task);

            taskResponse.setTaskId(task.getTaskId());
            taskResponse.setCustomerId(task.getCustomerId());
            taskResponse.setName(task.getName());
            taskResponse.setStatus(task.getStatus());
            taskResponse.setCreatedBy(task.getCreatedBy());
            taskResponse.setUpdateBy(task.getUpdateBy());
            taskResponse.setCreatedDate(task.getCreatedDate());
            taskResponse.setUpdateDate(task.getUpdateDate());
        }
        return taskResponse;
    }

    public Boolean removeDiscusById(DiscussionRequest discussionRequest) {
        Discussion delete = discussionRepository.findByDiscusId(discussionRequest.getDiscusId());
        if(delete != null) {
            discussionRepository.delete(delete);
            return true;
        }else{
            return false;
        }
    }

    public List<Discussion> getDiscus(AddDetailRequest taskRequest) {
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
