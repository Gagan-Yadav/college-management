package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.BranchDTO;
import com.yaduvanshi_brothers.api.DTOs.FacultyDTO;
import com.yaduvanshi_brothers.api.DTOs.StudentDTO;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public void addBranchService(BranchesEntity branchesEntity) {
        branchRepository.save(branchesEntity);
    }

    public List<BranchDTO> getAllBranches() {
        List<BranchesEntity> branches = branchRepository.findAll();
        return branches.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public BranchDTO getBranchByCode(String branchCode) {
        Optional<BranchesEntity> optionalBranch = branchRepository.findById(branchCode);
        return optionalBranch.map(this::convertToDTO).orElse(null);
    }

    public void editBranch(String branchCode, BranchDTO branchDTO) {
        Optional<BranchesEntity> optionalBranch = branchRepository.findById(branchCode);
        if (optionalBranch.isPresent()) {
            BranchesEntity branchEntity = optionalBranch.get();
            branchEntity.setBranchName(branchDTO.getBranchName());
            branchEntity.setHodName(branchDTO.getHodName());
            branchEntity.setSubjects(branchDTO.getSubjects());
            branchRepository.save(branchEntity);
        }
    }

    public void deleteBranch(String branchCode) {
        branchRepository.deleteById(branchCode);
    }

    private BranchDTO convertToDTO(BranchesEntity branch) {
        BranchDTO dto = new BranchDTO();
        dto.setBranchCode(branch.getBranchCode());
        dto.setBranchName(branch.getBranchName());
        dto.setHodName(branch.getHodName());
        dto.setSubjects(branch.getSubjects());

        List<FacultyDTO> facultyDTOs = branch.getFaculties().stream()
                .map(this::convertToFacultyDTO)
                .collect(Collectors.toList());
        dto.setFaculties(facultyDTOs);

        List<StudentDTO> studentDTOs = branch.getStudents().stream()
                .map(this::convertToStudentDTO)
                .collect(Collectors.toList());
        dto.setStudents(studentDTOs);

        return dto;
    }

    private FacultyDTO convertToFacultyDTO(FacultyEntity faculty) {
        FacultyDTO facultyDTO = new FacultyDTO();
        facultyDTO.setFacultyId(faculty.getFacultyId());
        facultyDTO.setName(faculty.getName());
        facultyDTO.setMobile(faculty.getMobile());
        facultyDTO.setEmail(faculty.getEmail());
        facultyDTO.setSalary(faculty.getSalary());
        facultyDTO.setDesignation(faculty.getDesignation());
        facultyDTO.setGender(faculty.getGender());
        facultyDTO.setDepartmentType(faculty.getDepartmentType());
        facultyDTO.setSubDepartment(faculty.getSubDepartment());
        return facultyDTO;
    }

    private StudentDTO convertToStudentDTO(StudentEntity student) {
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setStudentId(student.getStudentId());
        studentDTO.setRollNo(student.getRollNo());
        studentDTO.setStudentName(student.getStudentName());
        studentDTO.setEmail(student.getEmail());
        studentDTO.setMobile(student.getMobile());
        studentDTO.setAge(student.getAge());
        studentDTO.setAddress(student.getAddress());
        studentDTO.setYear(student.getYear());
        studentDTO.setSemester(student.getSemester());

        if (student.getBranch() != null) {
            studentDTO.setBranchCode(student.getBranch().getBranchCode());
        }

        return studentDTO;
    }
}
