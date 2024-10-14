package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faculties")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FacultyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer facultyId;

    @Column(name = "faculty_name")
    private String name;

    @Column(name = "faculty_mobile")
    private long mobile;

    @Column
    private String email;

    @Column
    private Long salary;

    @Column
    private String designation;

    @Column
    private String gender;

    @Column(name = "department_type")
    private String departmentType;

    @Column(name = "sub_department")
    private String subDepartment;

    @ManyToOne
    @JoinColumn(name = "branch_code")
    private BranchesEntity branch;

}
