package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.DTOs.AnnouncementDTO;
import com.yaduvanshi_brothers.api.entity.AnnouncementEntity;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.repository.AnnouncementRepository;
import com.yaduvanshi_brothers.api.repository.BranchRepository; // Assuming you have a repository for Branch
import com.yaduvanshi_brothers.api.repository.FacultyRepository; // Assuming you have a repository for Faculty
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private BranchRepository branchRepository; // Repository for Branches

    @Autowired
    private FacultyRepository facultyRepository; // Repository for Faculty

    public List<AnnouncementDTO> getAllAnnouncements() {
        return announcementRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AnnouncementDTO createAnnouncement(AnnouncementDTO announcementDTO) {
        AnnouncementEntity announcement = convertToEntity(announcementDTO);
        AnnouncementEntity savedAnnouncement = announcementRepository.save(announcement);
        return convertToDTO(savedAnnouncement);
    }

    public AnnouncementDTO updateAnnouncement(Integer id, AnnouncementDTO announcementDTO) {
        Optional<AnnouncementEntity> existingAnnouncement = announcementRepository.findById(id);
        if (existingAnnouncement.isPresent()) {
            AnnouncementEntity announcement = existingAnnouncement.get();
            announcement.setTitle(announcementDTO.getTitle());
            announcement.setDescription(announcementDTO.getDescription());
            announcement.setBranch(branchRepository.findById(announcementDTO.getBranchId()).orElse(null));
            announcement.setAnnouncer(facultyRepository.findById(announcementDTO.getAnnouncerId()).orElse(null));
            announcement.setExpirationDate(announcementDTO.getExpirationDate());
            announcement.setIsActive(announcementDTO.getIsActive());
            announcementRepository.save(announcement);
            return convertToDTO(announcement);
        }
        return null; // Or throw an exception
    }

    public void deleteAnnouncement(Integer id) {
        announcementRepository.deleteById(id);
    }

    private AnnouncementDTO convertToDTO(AnnouncementEntity announcement) {
        return new AnnouncementDTO(
                announcement.getAnnouncementId(),
                announcement.getTitle(),
                announcement.getDescription(),
                announcement.getBranch() != null ? announcement.getBranch().getBranchCode() : null,
                announcement.getAnnouncer() != null ? announcement.getAnnouncer().getFacultyId() : null,
                announcement.getCreatedAt(),
                announcement.getIsActive(),
                announcement.getExpirationDate()
        );
    }

    private AnnouncementEntity convertToEntity(AnnouncementDTO dto) {
        AnnouncementEntity announcement = new AnnouncementEntity();
        announcement.setTitle(dto.getTitle());
        announcement.setDescription(dto.getDescription());
        announcement.setBranch(branchRepository.findById(dto.getBranchId()).orElse(null));
        announcement.setAnnouncer(facultyRepository.findById(dto.getAnnouncerId()).orElse(null));
        announcement.setExpirationDate(dto.getExpirationDate());
        announcement.setIsActive(dto.getIsActive());
        return announcement;
    }
}
