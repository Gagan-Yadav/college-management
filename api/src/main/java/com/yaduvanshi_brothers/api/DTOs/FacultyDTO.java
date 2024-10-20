package com.yaduvanshi_brothers.api.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacultyDTO {
    private Integer facultyId;
    private String name;
    private long mobile;
    private String email;
    private Long salary;
    private String designation;
    private String gender;
    private String departmentType;
    private String subDepartment;
    private Integer branchCode; // Include branch code
    private List<Integer> lectureIds; // List to hold lecture IDs
}
