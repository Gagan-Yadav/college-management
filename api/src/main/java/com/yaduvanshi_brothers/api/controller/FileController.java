package com.yaduvanshi_brothers.api.controller;
import com.yaduvanshi_brothers.api.entity.AssignmentEntity;
import com.yaduvanshi_brothers.api.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
public class FileController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping("/download-file/{assignmentId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Integer assignmentId) {
        AssignmentEntity assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with ID: " + assignmentId));

        if (assignment.getAttachedFiles() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Set response headers for the file download
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + assignment.getFileName());
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        // Return the decoded file as a downloadable response
        return new ResponseEntity<>(assignment.getAttachedFiles(), headers, HttpStatus.OK);
    }
}
