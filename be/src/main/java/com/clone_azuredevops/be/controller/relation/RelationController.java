package com.clone_azuredevops.be.controller.relation;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clone_azuredevops.be.entity.jpa.relation.Relation;
import com.clone_azuredevops.be.model.common.SuccessResponse;
import com.clone_azuredevops.be.model.relation.RelationRequest;
import com.clone_azuredevops.be.model.relation.RelationResponse;
import com.clone_azuredevops.be.repository.jpa.RelationRepository;
import com.clone_azuredevops.be.service.relation.RelationService;


@RestController
@CrossOrigin()
@RequestMapping("/api/relation")
public class RelationController {
    
    @Autowired
    private RelationService relationService;

    @Autowired
    RelationRepository relationRepository;

    @PostMapping("/addRelation")        
    public ResponseEntity<SuccessResponse <RelationResponse>> register(@RequestBody RelationRequest relationRequest) {
        return ResponseEntity.ok(new SuccessResponse<RelationResponse>(relationService.addRelation(relationRequest)));
    }

    // @PatchMapping("/adddetail")        
    // public ResponseEntity<SuccessResponse <TaskResponse>> addDetail(@RequestBody TaskRequest taskRequest) {
    //     return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.addDetail(taskRequest)));
    // }

    // @DeleteMapping("/deleteDiscusById")
    // public Discussion deleteDiscusById(@RequestBody DiscussionRequest discussionRequest) {
    //     return taskService.removeDiscusById(discussionRequest);
    // }

    // @PatchMapping("/updateDiscusById")
    // public Discussion updateDiscusById(@RequestBody DiscussionRequest discussionRequest) {
    //     return taskService.updateDiscusById(discussionRequest);
    // }
    // @PatchMapping("/updateAssign")
    // public TaskResponse updateAssign(@RequestBody TaskRequest taskRequest) {
    //     return taskService.updateAssign(taskRequest);
    // }
    
    // @PostMapping("/getDiscus")
    // public List<Discussion> getDiscus(@RequestBody TaskRequest taskRequest) {
    //     return taskService.getDiscus(taskRequest);
    // }

    // @PostMapping("/gettaskid")
    // public ResponseEntity<SuccessResponse<TaskResponse>> getTaskById(@RequestBody TaskRequest taskRequest) {
    //     return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.getTaskById(taskRequest)));
    // }

    // @PatchMapping("/update")
    // public ResponseEntity<SuccessResponse <TaskResponse>> update(@RequestBody TaskRequest taskRequest) {
    //     return ResponseEntity.ok(new SuccessResponse<TaskResponse>(taskService.update(taskRequest)));
    // }

    // @DeleteMapping("/remove")
    // public ResponseEntity<SuccessResponse<String>> remove(@RequestBody TaskRequest taskRequest) {
    //     taskService.remove(taskRequest);
    //   return ResponseEntity.ok(new SuccessResponse<String>());
    // }




}

