package com.yaduvanshi_brothers.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "assignments")
public class AssignmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer year;
    private Integer semester;

    private String topic;

    @ManyToOne
    @JoinColumn(name = "branch_code")
    private BranchesEntity branchCode;

    private String subject;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    @JsonIgnore
    private FacultyEntity assignedBy;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @ElementCollection
    @Column(name = "questions")
    private List<String> questions;

    @ManyToMany(mappedBy = "assignments")
    private List<StudentEntity> students;

    private String assignmentType;
    private String category;
    private String status = "Pending";
    private Integer totalMarks;
    private String difficultyLevel;
    private String notes;

    @Column(columnDefinition = "LONGBLOB")
    @Lob
    private byte[] attachedFiles;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
