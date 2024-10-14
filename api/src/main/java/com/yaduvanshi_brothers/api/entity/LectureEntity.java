package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

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
    private int lectureId;

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

    @Column(name ="till")
    private Date till;

    @Column(name ="faculty_name")
    private String facultyName;

    @Column(name ="room_number")
    private int roomNumber;
  
}
