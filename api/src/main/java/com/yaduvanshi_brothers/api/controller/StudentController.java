package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.LectureDTO;
import com.yaduvanshi_brothers.api.DTOs.StudentDTO;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.service.LectureService;
import com.yaduvanshi_brothers.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private LectureService lectureService;

    @GetMapping("/get-all-students")
    public List<StudentDTO> getAllStudents() {
        List<StudentEntity> students = studentService.getAllStudentService();

        return students.stream().map(student -> {
            StudentDTO dto = new StudentDTO();
            dto.setStudentId(student.getStudentId());
            dto.setRollNo(student.getRollNo());
            dto.setStudentName(student.getStudentName());
            dto.setEmail(student.getEmail());
            dto.setMobile(student.getMobile());
            dto.setAge(student.getAge());
            dto.setAddress(student.getAddress());
            dto.setYear(student.getYear());
            dto.setSemester(student.getSemester());

            // Convert the branches to branch codes
            dto.setBranchCodes(student.getBranches().stream()
                    .map(BranchesEntity::getBranchCode) // Ensure getBranchCode() is defined
                    .collect(Collectors.toList()));

            return dto;
        }).collect(Collectors.toList());
    }



//
//    @GetMapping("/get-all-lectures")
//    public List<LectureDTO> getAllLectures() {
//        List<LectureEntity> lectures = lectureService.getAllLectures();
//        return lectures.stream().map(lecture -> {
//            LectureDTO dto = new LectureDTO();
//            dto.setLectureId(lecture.getLectureId());
//            dto.setYear(lecture.getYear());
//            dto.setSemester(lecture.getSemester());
//            dto.setDepartment(lecture.getDepartment());
//            dto.setSubject(lecture.getSubject());
//            dto.setStartFrom(lecture.getStartFrom());
//            dto.setTill(lecture.getTill());
//            dto.setFacultyName(lecture.getFacultyName());
//            dto.setRoomNumber(lecture.getRoomNumber());
//            dto.setFacultyId(lecture.getFaculty() != null ? lecture.getFaculty().getFacultyId() : null);
//            dto.setStudentIds(lecture.getStudents().stream().map(StudentEntity::getStudentId).collect(Collectors.toList()));
//            return dto;
//        }).collect(Collectors.toList());
//    }
}
