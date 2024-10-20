package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.FacultyDTO;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;

    public void addFacultyService(FacultyEntity facultyEntity){
        facultyRepository.save(facultyEntity);
    }

    public List<FacultyDTO> allFacultyService() {
        List<FacultyEntity> faculties = facultyRepository.findAll();
        return faculties.stream().map(faculty -> {
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

            // Set branch code
            if (faculty.getBranch() != null) {
                dto.setBranchCode(Integer.valueOf(faculty.getBranch().getBranchCode()));
            }

            // Set lecture IDs
            List<Integer> lectureIds = faculty.getLectures().stream()
                    .map(LectureEntity::getLectureId)
                    .collect(Collectors.toList());
            dto.setLectureIds(lectureIds);

            return dto;
        }).collect(Collectors.toList());
    }
}