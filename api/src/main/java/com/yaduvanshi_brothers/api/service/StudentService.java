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
    private StudentRespository studentRespository;

    public List<StudentEntity> getAllStudentService(){
        return studentRespository.findAll();
    }

    public Optional<StudentEntity> getStudentByIdService(int id){
        Optional<StudentEntity> student = studentRespository.findById(id);
        return student;
    }

    public void addUserService(StudentEntity studentData){
        studentRespository.save(studentData);
    }

    public void updateStudentById(StudentEntity student){
        studentRespository.save(student);
    }

    public void deleteStudentById(int id) {
        studentRespository.deleteById(id);
    }

}
