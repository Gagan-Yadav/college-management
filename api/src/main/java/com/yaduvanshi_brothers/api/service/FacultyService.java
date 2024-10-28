package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.FacultyDTO;
import com.yaduvanshi_brothers.api.DTOs.LectureDTO;
import com.yaduvanshi_brothers.api.entity.*;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import com.yaduvanshi_brothers.api.repository.FacultyRepository;
import com.yaduvanshi_brothers.api.repository.ImageRepository;
import com.yaduvanshi_brothers.api.utils.UploadImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private ImageService imageService;


    public void addFacultyService(FacultyEntity facultyEntity, MultipartFile image) throws IOException {
        System.out.println("Now we are in faculty add service...");

        if (image != null && !image.isEmpty()) {
            // Use ImageService to handle the image upload
            ImageEntity imageEntity = imageService.uploadImageService(image); // Upload image and get ImageEntity
            facultyEntity.setImageEntity(imageEntity); // Set the imageEntity in FacultyEntity
        }

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

    public Optional<FacultyDTO> getFacultyByIdService(int id) {
        Optional<FacultyEntity> facultyEntity = facultyRepository.findById(id);
        if (facultyEntity.isPresent()) {
            FacultyEntity entity = facultyEntity.get();
            FacultyDTO dto = new FacultyDTO();

            // Mapping fields
            dto.setFacultyId(entity.getFacultyId());
            dto.setName(entity.getName());
            dto.setMobile(entity.getMobile());
            dto.setEmail(entity.getEmail());
            dto.setSalary(entity.getSalary());
            dto.setDesignation(entity.getDesignation());
            dto.setGender(entity.getGender());
            dto.setDepartmentType(entity.getDepartmentType());
            dto.setSubDepartment(entity.getSubDepartment());
            dto.setBranchCode(entity.getBranch().getBranchCode());

            // Retrieve image URL from the ImageEntity
            if (entity.getImageEntity() != null) {
                dto.setImageUrl("http://localhost:8080/image/" + entity.getImageEntity().getId()); // Adjust based on how you store image names
            } else {
                dto.setImageUrl("default/image/url"); // Use a default image URL if none exists
            }

            // Get lecture IDs
            List<Integer> lectureIds = entity.getLectures().stream()
                    .map(LectureEntity::getLectureId)
                    .collect(Collectors.toList());
            dto.setLectureIds(lectureIds);

            // Convert lectures to LectureDTOs if needed
            List<LectureDTO> lectureDTOs = entity.getLectures().stream().map(lecture -> {
                LectureDTO lectureDTO = new LectureDTO();
                lectureDTO.setLectureId(lecture.getLectureId());
                lectureDTO.setYear(lecture.getYear());
                lectureDTO.setSemester(lecture.getSemester());
                lectureDTO.setDepartment(lecture.getDepartment());
                lectureDTO.setSubject(lecture.getSubject());
                lectureDTO.setStartFrom(lecture.getStartFrom());
                lectureDTO.setTill(lecture.getTill());
                lectureDTO.setRoomNumber(lecture.getRoomNumber());
                lectureDTO.setFacultyId(entity.getFacultyId());

                List<Integer> studentIds = lecture.getStudents().stream()
                        .map(StudentEntity::getStudentId)
                        .collect(Collectors.toList());
                lectureDTO.setStudentIds(studentIds);

                return lectureDTO;
            }).collect(Collectors.toList());

            dto.setLectures(lectureDTOs);

            return Optional.of(dto);
        }
        return Optional.empty();
    }

    public void updateFacultyService(Integer id, FacultyEntity facultyEntity, MultipartFile image) throws IOException {
        System.out.println("Now we are in faculty update service...");

        Optional<FacultyEntity> existingFacultyOpt = facultyRepository.findById(id);
        FacultyEntity existingFaculty = existingFacultyOpt.orElseThrow(() -> new IllegalArgumentException("Faculty with ID " + id + " not found."));

        if (facultyEntity.getName() != null) {
            existingFaculty.setName(facultyEntity.getName());
        }
        if (facultyEntity.getMobile() != null) {
            existingFaculty.setMobile(facultyEntity.getMobile());
        }
        if (facultyEntity.getEmail() != null) {
            existingFaculty.setEmail(facultyEntity.getEmail());
        }
        if (facultyEntity.getSalary() != null) {
            existingFaculty.setSalary(facultyEntity.getSalary());
        }
        if (facultyEntity.getDesignation() != null) {
            existingFaculty.setDesignation(facultyEntity.getDesignation());
        }
        if (facultyEntity.getGender() != null) {
            existingFaculty.setGender(facultyEntity.getGender());
        }
        if (facultyEntity.getDepartmentType() != null) {
            existingFaculty.setDepartmentType(facultyEntity.getDepartmentType());
        }
        if (facultyEntity.getSubDepartment() != null) {
            existingFaculty.setSubDepartment(facultyEntity.getSubDepartment());
        }

        if (facultyEntity.getBranch() != null && facultyEntity.getBranch().getBranchCode() != null) {
            String branchCode = facultyEntity.getBranch().getBranchCode();
            BranchesEntity branch = branchRepository.findById(branchCode)
                    .orElseThrow(() -> new IllegalArgumentException("Branch with code " + branchCode + " not found."));
            existingFaculty.setBranch(branch);
        }

        if (image != null && !image.isEmpty()) {
            try {
                ImageEntity imageEntity = imageService.uploadImageService(image);
                existingFaculty.setImageEntity(imageEntity);
            } catch (IOException e) {
                throw new IOException("Failed to upload image: " + e.getMessage(), e);
            }
        }

        facultyRepository.save(existingFaculty);
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
