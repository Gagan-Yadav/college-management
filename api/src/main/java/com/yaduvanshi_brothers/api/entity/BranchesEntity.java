package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="all_branches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BranchesEntity {

    @Id
    @Column(name="branch_code")
    private String branchCode;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "subjects")
    private List<String> subjects = new ArrayList<>();

    @Column(name="students")
    private List<String> students = new ArrayList<>();

    @Column
    private List<String> faculties = new ArrayList<>();

    @Column(name="hod_name")
    private String hodName;

}
