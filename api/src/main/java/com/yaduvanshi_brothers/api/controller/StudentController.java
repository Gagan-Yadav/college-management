package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.LectureDTO;
import com.yaduvanshi_brothers.api.DTOs.OnlineClassDTO;
import com.yaduvanshi_brothers.api.DTOs.StudentDTO;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    // Inside StudentController

    @GetMapping("/get-all-students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<StudentEntity> students = studentService.getAllStudentService();

        List<StudentDTO> studentDTOs = students.stream().map(student -> {
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

            BranchesEntity branch = student.getBranch();
            if (branch != null) {
                dto.setBranchCode(branch.getBranchCode());
            }

            List<LectureDTO> lectureDTOs = student.getLectures().stream().map(lecture -> {
                LectureDTO lectureDTO = new LectureDTO();
                lectureDTO.setLectureId(lecture.getLectureId());
                lectureDTO.setYear(lecture.getYear());
                lectureDTO.setSemester(lecture.getSemester());
                lectureDTO.setDepartment(lecture.getDepartment());
                lectureDTO.setSubject(lecture.getSubject());
                lectureDTO.setStartFrom(lecture.getStartFrom());
                lectureDTO.setTill(lecture.getTill());
                lectureDTO.setRoomNumber(lecture.getRoomNumber());

                FacultyEntity faculty = lecture.getFaculty();
                if (faculty != null) {
                    lectureDTO.setFacultyId(faculty.getFacultyId());
                }

                return lectureDTO;
            }).collect(Collectors.toList());

            dto.setLectures(lectureDTOs);

            // Adding Online Classes
            List<OnlineClassDTO> onlineClassDTOs = student.getOnlineClasses().stream().map(onlineClass -> {
                OnlineClassDTO onlineClassDTO = new OnlineClassDTO();
                onlineClassDTO.setOnlineLectureId(onlineClass.getOnlineLectureId());
                onlineClassDTO.setSubject(onlineClass.getSubject());
                onlineClassDTO.setBranchCode(onlineClass.getBranch().getBranchCode()); // Now this will work
                onlineClassDTO.setSemester(onlineClass.getSemester());
                onlineClassDTO.setPlatforms(onlineClass.getPlatforms());
                onlineClassDTO.setMeetingLink(onlineClass.getMeetingLink());
                onlineClassDTO.setStartFrom(onlineClass.getStartFrom());
                onlineClassDTO.setEnd(onlineClass.getEnd());

                FacultyEntity faculty = onlineClass.getFaculty();
                if (faculty != null) {
                    onlineClassDTO.setFacultyId(faculty.getFacultyId());
                }

                return onlineClassDTO;
            }).collect(Collectors.toList());

            dto.setOnlineClasses(onlineClassDTOs); // Assuming you have a corresponding setter in StudentDTO

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(studentDTOs);
    }


    @GetMapping("/get-student/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable int id) {
        Optional<StudentEntity> studentOpt = studentService.getStudentByIdService(id);

        if (studentOpt.isPresent()) {
            StudentEntity student = studentOpt.get();
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

            BranchesEntity branch = student.getBranch();
            if (branch != null) {
                dto.setBranchCode(branch.getBranchCode());
            }

            // Fetching online classes
            List<OnlineClassDTO> onlineClassDTOs = student.getOnlineClasses().stream().map(onlineClass -> {
                OnlineClassDTO onlineClassDTO = new OnlineClassDTO();
                onlineClassDTO.setOnlineLectureId(onlineClass.getOnlineLectureId());
                onlineClassDTO.setSubject(onlineClass.getSubject());
                onlineClassDTO.setBranchCode(onlineClass.getBranch().getBranchCode());
                onlineClassDTO.setSemester(onlineClass.getSemester());
                onlineClassDTO.setPlatforms(onlineClass.getPlatforms());
                onlineClassDTO.setMeetingLink(onlineClass.getMeetingLink());
                onlineClassDTO.setStartFrom(onlineClass.getStartFrom());
                onlineClassDTO.setEnd(onlineClass.getEnd());

                FacultyEntity faculty = onlineClass.getFaculty();
                if (faculty != null) {
                    onlineClassDTO.setFacultyId(faculty.getFacultyId());
                }

                return onlineClassDTO;
            }).collect(Collectors.toList());

            dto.setOnlineClasses(onlineClassDTOs); // Set the online classes in the DTO

            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @PostMapping("/update-student/{studentId}")
    public ResponseEntity<StudentDTO> updateStudentById(@PathVariable int studentId, @RequestBody StudentDTO studentDTO) {
        StudentDTO updatedStudent = studentService.updateStudentService(studentId, studentDTO);
        return ResponseEntity.ok(updatedStudent);
    }

    // Delete student by ID
    @DeleteMapping("/delete-student/{studentId}")
    public ResponseEntity<String> deleteStudentById(@PathVariable int studentId) {
        studentService.deleteStudentService(studentId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Student and all associations deleted successfully.");
    }

    @PostMapping("/add-student")
    public ResponseEntity<?> addStudent(@RequestBody StudentEntity studentEntity) {
        if (studentEntity.getBranch() == null) {
            return ResponseEntity.badRequest().body("A branch must be specified.");
        }

        BranchesEntity branch = studentEntity.getBranch();

        branch.getStudents().add(studentEntity);

        studentService.addStudentService(studentEntity);

        StudentDTO dto = new StudentDTO();
        dto.setStudentId(studentEntity.getStudentId());
        dto.setRollNo(studentEntity.getRollNo());
        dto.setStudentName(studentEntity.getStudentName());
        dto.setEmail(studentEntity.getEmail());
        dto.setMobile(studentEntity.getMobile());
        dto.setAge(studentEntity.getAge());
        dto.setAddress(studentEntity.getAddress());
        dto.setYear(studentEntity.getYear());
        dto.setSemester(studentEntity.getSemester());

        dto.setBranchCode(branch.getBranchCode());

        return ResponseEntity.status(HttpStatus.CREATED).body("Student added successfully");
    }

}
