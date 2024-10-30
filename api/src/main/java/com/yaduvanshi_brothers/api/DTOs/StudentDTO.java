package com.yaduvanshi_brothers.api.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private int studentId;
    private String rollNo;
    private String studentName;
    private String email;
    private Long mobile;
    private int age;
    private String address;
    private int year;
    private int semester;
    private String branchCode;
    private List<LectureDTO> lectures;
    private List<OnlineClassDTO> onlineClasses;
}