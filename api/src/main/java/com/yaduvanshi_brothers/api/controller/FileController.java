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
@RequestMapping("/files")
public class FileController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping("/download-file/{assignmentId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Integer assignmentId) {
        System.out.println("we are in file download controller...");
        AssignmentEntity assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with ID: " + assignmentId));

        if (assignment.getAttachedFiles() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        System.out.println("we have checked the attached file...");
        // Set response headers for the file download
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + assignment.getFileName());
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        System.out.println("file downloaded");
        // Return the decoded file as a downloadable response
        return new ResponseEntity<>(assignment.getAttachedFiles(), headers, HttpStatus.OK);
    }
}

