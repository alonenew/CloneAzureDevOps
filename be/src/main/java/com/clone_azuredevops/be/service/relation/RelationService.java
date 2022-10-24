package com.clone_azuredevops.be.service.relation;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clone_azuredevops.be.repository.jpa.RelationRepository;
import com.clone_azuredevops.be.repository.jpa.TaskRepository;


@Service
public class RelationService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    RelationRepository relationRepository;

    

}
