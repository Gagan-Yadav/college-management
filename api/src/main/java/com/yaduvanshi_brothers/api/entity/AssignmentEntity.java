package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "assignments")
public class AssignmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer year;
    private Integer semester;

    @Column(name = "branch_code", nullable = false, insertable = false, updatable = false)
    private String branchCode;

    @ManyToOne
    @JoinColumn(name = "branch_code")
    private BranchesEntity branch;

    private String subject;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    private FacultyEntity assignedBy;  // Refers to faculty who assigned the work

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @ElementCollection
    @Column(name = "questions")
    private List<String> questions;

    @ManyToMany
    @JoinTable(
            name = "assignment_student",
            joinColumns = @JoinColumn(name = "assignment_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<StudentEntity> students;  // Students assigned to the assignment

    @Column(name = "assignment_type")
    private String assignmentType;

    @Column(name = "category")
    private String category;

    @Column(name = "status", nullable = false)
    private String status = "Pending";

    @Column(name = "total_marks")
    private Integer totalMarks;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "notes")
    private String notes;

    @Lob
    @Column(name = "attached_files")
    private byte[] attachedFiles;  // Stores attached files as byte data

    @Column(name = "created_at", updatable = false)
    private LocalDate createdAt = LocalDate.now();

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDate.now();
    }
}
