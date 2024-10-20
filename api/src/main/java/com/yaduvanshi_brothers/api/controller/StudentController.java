package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/get-all-students")
    public ResponseEntity<List<StudentEntity>> getAllStudentController(){
        List<StudentEntity> allStudents = studentService.getAllStudentService();
        return new ResponseEntity<>(allStudents, HttpStatus.OK);
    }

    @PostMapping("/add-new-student")
    public ResponseEntity<String> addStudentController(@RequestBody StudentEntity student){
        studentService.addUserService(student);
        return new ResponseEntity<>("Student added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/get-student-by-id/{id}")
    public ResponseEntity<Optional<StudentEntity>> getStudentByIdController(@PathVariable int id){
        Optional<StudentEntity> student = studentService.getStudentByIdService(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @PatchMapping("/update-student-by-id/{id}")
    public ResponseEntity<String> updateStudentById(@PathVariable int id, @RequestBody StudentEntity student){
        Optional<StudentEntity> studentInDb = studentService.getStudentByIdService(id);
        if (studentInDb.isPresent()) {
            StudentEntity existingStudent = studentInDb.get();
            existingStudent.setRollNo(student.getRollNo());
            existingStudent.setStudentName(student.getStudentName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setMobile(student.getMobile());
            existingStudent.setAge(student.getAge());
            existingStudent.setAddress(student.getAddress());
            existingStudent.setYear(student.getYear());
            existingStudent.setSemester(student.getSemester());
            existingStudent.setBranches(student.getBranches());

            studentService.updateStudentById(existingStudent);
            return new ResponseEntity<>("Student details updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete-student-by-id/{id}")
    public ResponseEntity<String> deleteStudentByIdController(@PathVariable int id){
        Optional<StudentEntity> student = studentService.getStudentByIdService(id);
        if (student.isPresent()) {
            studentService.deleteStudentById(id);
            return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
    }
}
