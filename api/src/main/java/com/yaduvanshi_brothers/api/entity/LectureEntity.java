package com.yaduvanshi_brothers.api.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "lectures")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LectureEntity {

    @Id
    @Column(name = "lecture_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lectureId;

    @Column
    private int year;

    @Column
    private int semester;

    @Column
    private String department;

    @Column
    private String subject;

    @Column(name = "start_from")
    private Date startFrom;

    @Column(name = "till")
    private Date till;

    @Column(name = "room_number")
    private int roomNumber;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "faculty_id")
    @JsonIgnore
    private FacultyEntity faculty;

    @ManyToMany
    @JoinTable(
            name = "lecture_students",
            joinColumns = @JoinColumn(name = "lecture_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    @JsonIgnore
    private List<StudentEntity> students = new ArrayList<>();
}
