package com.clone_azuredevops.be.controller.relation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public Boolean register(@RequestBody RelationRequest relationRequest) {
        return relationService.addRelation(relationRequest);
    }


}

