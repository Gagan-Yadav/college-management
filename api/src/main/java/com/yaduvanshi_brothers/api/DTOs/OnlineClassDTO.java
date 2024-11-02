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
public class OnlineClassDTO {
    private Integer onlineLectureId;
    private String subject;
    private String branchCode;  // Reference only the branch code
    private int semester;
    private String platforms;  // Use Strings for platforms
    private String meetingLink;
    private String startFrom;
    private String end;
    private Integer facultyId;  // Reference only the faculty ID
    private List<Integer> studentIds;  // Reference only student IDs
}
