package com.clone_azuredevops.be.repository.jpa;

import com.clone_azuredevops.be.entity.jpa.discussion.Discussion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion , Integer> {
    List<Discussion> findByTaskIdOrderByCreatedDateDesc(Integer taskId);
    Discussion findByDiscusId(String discusId);
    List<Discussion> findByTaskId(Integer taskId);
}
