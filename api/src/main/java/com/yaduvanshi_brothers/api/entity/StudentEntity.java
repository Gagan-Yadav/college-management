package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column
    private String branch;

//    @Column
//    private Image image;
}
