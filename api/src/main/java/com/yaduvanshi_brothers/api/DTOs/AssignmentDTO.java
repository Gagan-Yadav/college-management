package com.yaduvanshi_brothers.api.DTOs;

import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AssignmentDTO {

    private Integer id;
    private Integer year;
    private Integer semester;
    private String branchCode;
    private String subject;
    private FacultyDTO assignedBy;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;

    private List<String> questions;
    private List<Integer> studentIds;
    private String assignmentType;
    private String category;
    private String status;
    private Integer totalMarks;
    private String difficultyLevel;
    private String notes;
    private String downloadUrl;
}
