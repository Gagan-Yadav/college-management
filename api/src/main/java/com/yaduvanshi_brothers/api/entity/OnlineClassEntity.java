package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "online_classes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OnlineClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "online_lecture_id")
    private Integer onlineLectureId;

    @Column
    private String subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_code", referencedColumnName = "branch_code")
    private BranchesEntity branch;

    @Column
    private int semester;

    @Column(name = "platform")
    private String platforms;

    @Column(name = "meeting_link")
    private String meetingLink;

    @Column(name="start_from")
    private String startFrom;

    @Column(name = "end")
    private String end;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id", referencedColumnName = "facultyId")
    private FacultyEntity faculty;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})  // Remove REMOVE from cascade
    @JoinTable(
            name = "online_class_students",
            joinColumns = @JoinColumn(name = "online_lecture_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<StudentEntity> students = new ArrayList<>();
}
