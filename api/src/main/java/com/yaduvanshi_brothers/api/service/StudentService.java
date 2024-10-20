package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.repository.StudentRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRespository studentRepository;

    // Retrieve all students
    public List<StudentEntity> getAllStudentService() {
        return studentRepository.findAll();
    }

    // Add a new student
    public void addUserService(StudentEntity studentEntity) {
        studentRepository.save(studentEntity);
    }

    // Get a student by ID
    public Optional<StudentEntity> getStudentByIdService(int id) {
        return studentRepository.findById(String.valueOf(id));
    }

    // Update student details by ID
    public void updateStudentById(StudentEntity studentEntity) {
        studentRepository.save(studentEntity);
    }

    // Delete student by ID
    public void deleteStudentById(int id) {
        studentRepository.deleteById(String.valueOf(id));
    }
}
