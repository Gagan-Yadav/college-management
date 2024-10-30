package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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
    private Long mobile;

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

    @OneToMany(mappedBy = "faculty", cascade = CascadeType.ALL)
    private List<LectureEntity> lectures = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private ImageEntity imageEntity;

    @OneToMany(mappedBy = "faculty", cascade = CascadeType.ALL)
    private List<OnlineClassEntity> onlineClasses = new ArrayList<>();

    @OneToMany(mappedBy = "announcer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AnnouncementEntity> announcements = new ArrayList<>();

}
