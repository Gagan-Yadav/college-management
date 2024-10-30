package com.yaduvanshi_brothers.api.DTOs;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AssignmentDTO {

    private Long id;
    private Integer year;
    private Integer semester;
    private String branchCode;       // Branch identifier only
    private String subject;
    private Integer assignedBy;         // Faculty ID instead of full FacultyEntity
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> questions;  // Array of questions without linking to a separate table
    private List<Long> studentIds;   // List of Student IDs instead of full StudentEntity
    private String assignmentType;   // Type of assignment (e.g., Assignment, Unit Test)
    private String category;         // Category (e.g., Theory, Practical)
    private String status;           // Status of the assignment
    private Integer totalMarks;
    private String difficultyLevel;
    private String notes;
    private byte[] attachedFiles;    // File data in byte array format for PDF support
    private String fileName;         // Original file name if applicable
}
