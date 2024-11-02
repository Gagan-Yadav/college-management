package com.yaduvanshi_brothers.api.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementDTO {
    private Integer announcementId;
    private String title;
    private String description;
    private String branchId;
    private Integer announcerId;
    private LocalDateTime createdAt;
    private Boolean isActive;
    private LocalDateTime expirationDate;
}
