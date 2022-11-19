package com.clone_azuredevops.be.repository.jpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.clone_azuredevops.be.entity.jpa.relation.Relation;

@Repository
public interface RelationRepository extends CrudRepository<Relation, Integer>{
    List<Relation> findAllByTaskId(Integer taskId);
    Relation findByTaskId(Integer taskId);
    Relation findByLinkTypeAndTaskLink(Integer linkType, Integer taskLink);
}
