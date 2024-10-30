package com.yaduvanshi_brothers.api.service;


import com.yaduvanshi_brothers.api.entity.AssignmentEntity;
import com.yaduvanshi_brothers.api.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public void createAssignmentService(AssignmentEntity assignmentData){
        assignmentRepository.save(assignmentData);
    }

    public List<AssignmentEntity> listAllAssignmentsService(){
        return assignmentRepository.findAll();
    }

}
