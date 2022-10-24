package com.clone_azuredevops.be.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clone_azuredevops.be.entity.jpa.relation.Relation;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Integer>{

}
