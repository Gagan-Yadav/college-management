package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.AnnouncementDTO;
import com.yaduvanshi_brothers.api.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @GetMapping("/get-all-announcement")
    public List<AnnouncementDTO> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    @PostMapping("/add-announcement")
    public ResponseEntity<AnnouncementDTO> createAnnouncement(@RequestBody AnnouncementDTO announcementDTO) {
        AnnouncementDTO createdAnnouncement = announcementService.createAnnouncement(announcementDTO);
        return ResponseEntity.ok(createdAnnouncement);
    }

    @PostMapping("/update-announcement-by-id/{id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(
            @PathVariable Integer id,
            @RequestBody AnnouncementDTO announcementDTO) {
        AnnouncementDTO updatedAnnouncement = announcementService.updateAnnouncement(id, announcementDTO);
        return updatedAnnouncement != null
                ? ResponseEntity.ok(updatedAnnouncement)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete-announcement/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Integer id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }
}
