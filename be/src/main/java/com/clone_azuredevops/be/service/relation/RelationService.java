package com.clone_azuredevops.be.service.relation;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.clone_azuredevops.be.entity.jpa.relation.Relation;
import com.clone_azuredevops.be.model.relation.RelationRequest;
import com.clone_azuredevops.be.model.relation.RelationResponse;
import com.clone_azuredevops.be.repository.jpa.RelationRepository;
import com.clone_azuredevops.be.repository.jpa.TaskRepository;


@Service
public class RelationService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    RelationRepository relationRepository;

    @Transactional
    public RelationResponse addRelation(RelationRequest relationRequest) {
        UUID uuid = UUID.randomUUID();
        UUID uuid2 = UUID.randomUUID();
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        Relation relation = new Relation();
        relation.setRelationId(dateFormat.format(date) + uuid.toString());
        relation.setLinkType(relationRequest.getLinkType());
        relation.setTaskId(relationRequest.getTaskId());
        relation.setTaskLink(relationRequest.getTaskLink());
        relation.setComment(relationRequest.getComment());
        relation.setCreatedBy(relationRequest.getCustomerId());
        relation.setCreatedDate(date);
        relation.setUpdateBy(relationRequest.getCustomerId());
        relation.setUpdateDate(date);

        Relation relation2 = new Relation();
        relation2.setRelationId(dateFormat.format(date) + uuid2.toString());
        if (relationRequest.getLinkType() == 1) {
            relation2.setLinkType(2);
        } else if (relationRequest.getLinkType() == 2) {
            relation2.setLinkType(1);
        }else{
            relation2.setLinkType(3);
        }
        relation2.setTaskLink(relationRequest.getTaskId());
        relation2.setTaskId(relationRequest.getTaskLink());
        relation2.setComment(relationRequest.getComment());
        relation2.setCreatedBy(relationRequest.getCustomerId());
        relation2.setCreatedDate(date);
        relation2.setUpdateBy(relationRequest.getCustomerId());
        relation2.setUpdateDate(date);

        relationRepository.saveAll(List.of(relation, relation2));

        RelationResponse relationResponse = new RelationResponse();
        return relationResponse;
    }


}
