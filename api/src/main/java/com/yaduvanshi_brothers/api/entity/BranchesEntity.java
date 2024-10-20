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
@Table(name = "all_branches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BranchesEntity {

    @Id
    @Column(name = "branch_code")
    private String branchCode;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "hod_name")
    private String hodName;

    // One Branch can have many Faculties
    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    @JsonIgnore // Prevent serialization to avoid circular dependency
    private List<FacultyEntity> faculties = new ArrayList<>();

    // One Branch can offer many Subjects (directly shown in the same table)
    @ElementCollection
    @Column(name = "subject")
    private List<String> subjects = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "student_branches",
            joinColumns = @JoinColumn(name = "branch_code"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<StudentEntity> students = new ArrayList<>();
}
