package com.yaduvanshi_brothers.api.DTOs;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LectureDTO {
    private Integer lectureId;
    private int year;
    private int semester;
    private String department;
    private String subject;
    private Date startFrom;
    private Date till;
    private int roomNumber;
    private Integer facultyId;
    private List<Integer> studentIds;
}