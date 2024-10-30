package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.AssignmentEntity;
import com.yaduvanshi_brothers.api.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("/create-assignment")
    public String createAssignment(@RequestBody AssignmentEntity assignmentDate) {
        assignmentService.createAssignmentService(assignmentDate);
        return "assignment created";
    }

    @GetMapping("/get-all-assignments")
    public ResponseEntity<List<AssignmentEntity>> listAssignments() {
        List<AssignmentEntity> assignments = assignmentService.listAllAssignmentsService();
        return ResponseEntity.ok(assignments);
    }
}
