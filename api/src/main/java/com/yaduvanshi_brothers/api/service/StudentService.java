package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.LectureDTO;
import com.yaduvanshi_brothers.api.DTOs.StudentDTO;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import com.yaduvanshi_brothers.api.repository.LectureRepository;
import com.yaduvanshi_brothers.api.repository.StudentRespository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class StudentService {

    @Autowired
    private StudentRespository studentRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private LectureRepository lectureRepository;

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

    @Transactional
    public StudentDTO updateStudentService(int studentId, StudentDTO studentDTO) {
        // Find the existing student by ID
        StudentEntity studentEntity = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Update fields
        studentEntity.setRollNo(studentDTO.getRollNo());
        studentEntity.setStudentName(studentDTO.getStudentName());
        studentEntity.setEmail(studentDTO.getEmail());
        studentEntity.setMobile(studentDTO.getMobile());
        studentEntity.setAge(studentDTO.getAge());
        studentEntity.setAddress(studentDTO.getAddress());
        studentEntity.setYear(studentDTO.getYear());
        studentEntity.setSemester(studentDTO.getSemester());

        // Update branch
        if (studentDTO.getBranchCode() != null) {
            Optional<BranchesEntity> optionalBranch = Optional.ofNullable(branchRepository.findByBranchCode(studentDTO.getBranchCode()));
            if (optionalBranch.isPresent()) {
                studentEntity.setBranch(optionalBranch.get());
            }
        }

        // Save and return the updated student
        StudentEntity updatedStudent = studentRepository.save(studentEntity);
        return convertToDTO(updatedStudent); // Assuming you have a method to convert to StudentDTO
    }

    // Method to convert StudentEntity to StudentDTO
    private StudentDTO convertToDTO(StudentEntity studentEntity) {
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

        // Set other properties as necessary
        if (studentEntity.getBranch() != null) {
            dto.setBranchCode(studentEntity.getBranch().getBranchCode());
        }

        return dto;
    }


    // Delete student by ID with cascading
    @Transactional
    public void deleteStudentService(int studentId) {
        Optional<StudentEntity> optionalStudent = studentRepository.findById(studentId);
        if (optionalStudent.isEmpty()) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
        StudentEntity studentEntity = optionalStudent.get();

        // Clear associations with lectures
        studentEntity.getLectures().forEach(lecture -> {
            lecture.setStudents(null); // Detach the student from each lecture
            lectureRepository.save(lecture); // Save lecture after detaching student
        });
        studentEntity.getLectures().clear();

        // Remove student from branch association
        BranchesEntity branch = studentEntity.getBranch();
        if (branch != null) {
            branch.getStudents().remove(studentEntity);
            branchRepository.save(branch); // Save branch after removing student
        }

        // Delete student
        studentRepository.delete(studentEntity);
    }
}
