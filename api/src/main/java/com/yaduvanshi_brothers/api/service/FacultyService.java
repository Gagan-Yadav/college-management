package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.FacultyDTO;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import com.yaduvanshi_brothers.api.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private BranchRepository branchRepository;

    public void addFacultyService(FacultyEntity facultyEntity) {
        System.out.println("Received Faculty Data: " + facultyEntity);

        if (facultyEntity.getBranch() != null && facultyEntity.getBranch().getBranchCode() != null) {
            String branchCode = facultyEntity.getBranch().getBranchCode();
            Optional<BranchesEntity> branchOpt = branchRepository.findById(branchCode);

            if (branchOpt.isPresent()) {
                BranchesEntity branch = branchOpt.get();
                facultyEntity.setBranch(branch);
                branch.getFaculties().add(facultyEntity);
                facultyRepository.save(facultyEntity);
                branchRepository.save(branch);
            } else {
                throw new IllegalArgumentException("Branch with code " + branchCode + " not found.");
            }
        } else {
            throw new IllegalArgumentException("Branch information is missing.");
        }
    }

    public List<FacultyEntity> allFacultyService1() {
        return facultyRepository.findAll();
    }


    public List<FacultyDTO> allFacultyService() {
        List<FacultyEntity> faculties = facultyRepository.findAll();
        return faculties.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public FacultyDTO getFacultyByIdService(Integer id) {
        return facultyRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public void updateFacultyService(Integer id, FacultyEntity facultyEntity) {
        Optional<FacultyEntity> existingFaculty = facultyRepository.findById(id);
        if (existingFaculty.isPresent()) {
            FacultyEntity updatedFaculty = existingFaculty.get();
            updatedFaculty.setName(facultyEntity.getName());
            updatedFaculty.setMobile(facultyEntity.getMobile());
            updatedFaculty.setEmail(facultyEntity.getEmail());
            updatedFaculty.setSalary(facultyEntity.getSalary());
            updatedFaculty.setDesignation(facultyEntity.getDesignation());
            updatedFaculty.setGender(facultyEntity.getGender());
            updatedFaculty.setDepartmentType(facultyEntity.getDepartmentType());
            updatedFaculty.setSubDepartment(facultyEntity.getSubDepartment());
            updatedFaculty.setBranch(facultyEntity.getBranch()); // Update the branch
            facultyRepository.save(updatedFaculty);
        }
    }

    public void deleteFacultyService(Integer id) {
        facultyRepository.deleteById(id);
    }

    private FacultyDTO convertToDTO(FacultyEntity faculty) {
        FacultyDTO dto = new FacultyDTO();
        dto.setFacultyId(faculty.getFacultyId());
        dto.setName(faculty.getName());
        dto.setMobile(faculty.getMobile());
        dto.setEmail(faculty.getEmail());
        dto.setSalary(faculty.getSalary());
        dto.setDesignation(faculty.getDesignation());
        dto.setGender(faculty.getGender());
        dto.setDepartmentType(faculty.getDepartmentType());
        dto.setSubDepartment(faculty.getSubDepartment());

        if (faculty.getBranch() != null) {
            dto.setBranchCode(faculty.getBranch().getBranchCode());
        }

        if (faculty.getLectures() != null && !faculty.getLectures().isEmpty()) {
            List<Integer> lectureIds = faculty.getLectures().stream()
                    .map(LectureEntity::getLectureId)
                    .collect(Collectors.toList());
            dto.setLectureIds(lectureIds);
        }

        return dto;
    }


    public void updateFaculty(FacultyEntity faculty) {
        facultyRepository.save(faculty);
    }

}
