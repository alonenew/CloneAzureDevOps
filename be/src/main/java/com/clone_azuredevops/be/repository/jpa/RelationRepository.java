package com.clone_azuredevops.be.repository.jpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.clone_azuredevops.be.entity.jpa.relation.Relation;

@Repository
public interface RelationRepository extends CrudRepository<Relation, Integer>{
    List<Relation> findByTaskId(Integer taskId);
}
