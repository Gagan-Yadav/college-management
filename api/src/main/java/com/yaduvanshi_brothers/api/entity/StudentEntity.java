package com.yaduvanshi_brothers.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    @Column(name = "roll_no")
    private String rollNo;

    @Column(name = "student_name")
    private String studentName;

    @Column
    private String email;

    @Column(name = "mobile_number")
    private Long mobile;

    @Column
    private int age;

    @Column
    private String address;

    @Column
    private int year;

    @Column
    private int semester;

    // Many-to-Many relationship with Branch
    @ManyToMany
    @JoinTable(
            name = "student_branches",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "branch_code")
    )
    private List<BranchesEntity> branches = new ArrayList<>();

    // Prevent circular dependency by ignoring this field
    @ManyToMany(mappedBy = "students")
    @JsonIgnore // Prevent serialization
    private List<LectureEntity> lectures = new ArrayList<>();
}
