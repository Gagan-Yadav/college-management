package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "faculties")
@Data
public class FacultyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int facultyId;

    @Column(name = "faculty_name")
    private int name;

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
    private String subDepartent;

}
