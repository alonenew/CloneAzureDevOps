package com.clone_azuredevops.be.controller.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;
import com.clone_azuredevops.be.entity.jpa.task.Task;
import com.clone_azuredevops.be.model.common.SuccessResponse;
import com.clone_azuredevops.be.model.task.AddDetailRequest;
import com.clone_azuredevops.be.model.task.DiscussionRequest;
import com.clone_azuredevops.be.model.task.TaskRequest;
import com.clone_azuredevops.be.model.task.TaskResponse;
import com.clone_azuredevops.be.repository.jpa.TaskRepository;
import com.clone_azuredevops.be.service.task.TaskService;


@RestController
@CrossOrigin()
@RequestMapping("/api/tasks")
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    @Autowired
    TaskRepository taskRepository;

    @PostMapping("/addtask")        
    public ResponseEntity<SuccessResponse <TaskResponse>> register(@RequestBody TaskRequest taskRequest) {
        return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.addTask(taskRequest)));
    }
    @PatchMapping("/adddetail")        
    public ResponseEntity<SuccessResponse <TaskResponse>> addDetail(@RequestBody AddDetailRequest addDetailRequest) {
        return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.addDetail(addDetailRequest)));
    }

    @GetMapping("/gettask")
	public  List<Task> getTask(){
		return taskService.getTask();
	}

    @DeleteMapping("/deleteDiscusById")
    public Boolean deleteDiscusById(@RequestBody DiscussionRequest discussionRequest) {
        return taskService.removeDiscusById(discussionRequest);
    }

    @PatchMapping("/updateDiscusById")
    public Discussion updateDiscusById(@RequestBody DiscussionRequest discussionRequest) {
        return taskService.updateDiscusById(discussionRequest);
    }
    
    @PatchMapping("/updateAssign")
    public TaskResponse updateAssign(@RequestBody AddDetailRequest taskRequest) {
        return taskService.updateAssign(taskRequest);
    }
    
    @PostMapping("/getDiscus")
    public List<Discussion> getDiscus(@RequestBody AddDetailRequest taskRequest) {
        return taskService.getDiscus(taskRequest);
    }

    @PostMapping("/gettaskid")
    public ResponseEntity<SuccessResponse<TaskResponse>> getTaskById(@RequestBody TaskRequest taskRequest) {
        return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.getTaskById(taskRequest)));
    }

    @PatchMapping("/update")
    public ResponseEntity<SuccessResponse <TaskResponse>> update(@RequestBody AddDetailRequest taskRequest) {
        return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.update(taskRequest)));
    }

    @DeleteMapping("/remove")
    public Boolean remove(@RequestBody TaskRequest taskRequest) {
      return taskService.remove(taskRequest);
    }




}

