package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.AnnouncementDTO;
import com.yaduvanshi_brothers.api.DTOs.BranchDTO;
import com.yaduvanshi_brothers.api.DTOs.FacultyDTO;
import com.yaduvanshi_brothers.api.DTOs.StudentDTO;
import com.yaduvanshi_brothers.api.entity.AnnouncementEntity;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.repository.AnnouncementRepository;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private AnnouncementRepository announcementRepository;

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

        // Fetch and set announcements for the branch
        List<AnnouncementDTO> announcementDTOs = announcementRepository.findByBranch(branch).stream()
                .map(this::convertToAnnouncementDTO)
                .collect(Collectors.toList());
        dto.setAnnouncements(announcementDTOs); // Make sure you have this field in BranchDTO

        return dto;
    }

    // Add method to convert AnnouncementEntity to AnnouncementDTO
    private AnnouncementDTO convertToAnnouncementDTO(AnnouncementEntity announcement) {
        AnnouncementDTO announcementDTO = new AnnouncementDTO();
        announcementDTO.setAnnouncementId(announcement.getAnnouncementId());
        announcementDTO.setTitle(announcement.getTitle());
        announcementDTO.setDescription(announcement.getDescription());
        announcementDTO.setCreatedAt(announcement.getCreatedAt());
        announcementDTO.setIsActive(announcement.getIsActive());
        // Add more fields as necessary
        return announcementDTO;
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

        // Map the imageData, converting to Base64 if necessary
        if (faculty.getImageEntity() != null) {
            facultyDTO.setImageUrl("http://localhost:8080/image/" + faculty.getImageEntity().getId());
        } else {
            facultyDTO.setImageUrl("default/image/url");  // Optional: Set a default image URL if no image is found
        }


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
