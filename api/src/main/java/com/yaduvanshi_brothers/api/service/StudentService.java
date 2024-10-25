package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import com.yaduvanshi_brothers.api.repository.StudentRespository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class StudentService {

    @Autowired
    private StudentRespository studentRepository;

    @Autowired
    private BranchRepository branchRepository;

    // Retrieve all students
    public List<StudentEntity> getAllStudentService() {
        return studentRepository.findAll();
    }

    public void addStudentService(StudentEntity studentEntity) {
        BranchesEntity branch = studentEntity.getBranch();

        Optional<BranchesEntity> existingBranchOpt = branchRepository.findById(branch.getBranchCode());
        if (existingBranchOpt.isPresent()) {
            BranchesEntity existingBranch = existingBranchOpt.get();

            if (!existingBranch.getStudents().contains(studentEntity)) {
                existingBranch.getStudents().add(studentEntity);
            } else {
                throw new IllegalStateException("Student already belongs to this branch");
            }

            studentEntity.setBranch(existingBranch);

            studentRepository.save(studentEntity);
        } else {
            throw new EntityNotFoundException("Branch with code " + branch.getBranchCode() + " not found.");
        }
    }

    public Optional<StudentEntity> getStudentByIdService(int id) {
        return studentRepository.findById(Integer.valueOf(String.valueOf(id)));
    }

    public void updateStudentById(StudentEntity studentEntity) {
        Optional<BranchesEntity> existingBranchOpt = branchRepository.findById(studentEntity.getBranch().getBranchCode());
        if (existingBranchOpt.isPresent()) {

            studentRepository.save(studentEntity);
        } else {
            throw new EntityNotFoundException("Branch with code " + studentEntity.getBranch().getBranchCode() + " not found.");
        }
    }

    public void deleteStudentById(int id) {
        studentRepository.deleteById(Integer.valueOf(String.valueOf(id)));
    }
}
