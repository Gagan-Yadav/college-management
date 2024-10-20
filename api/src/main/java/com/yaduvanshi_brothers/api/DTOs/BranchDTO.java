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
public class BranchDTO {
    private String branchCode;
    private String branchName;
    private String hodName;
    private List<String> subjects;
    private List<FacultyDTO> faculties;// Just as an example
    private List<StudentDTO> students;
}
