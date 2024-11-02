package com.yaduvanshi_brothers.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "announcements")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer announcementId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private BranchesEntity branch; // Relationship to Branch

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "announcer_id", nullable = false)
    private FacultyEntity announcer; // Relationship to Person (Faculty)

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true; // To indicate if the announcement is active

    // Optionally, you can add fields like expiration date or visibility status
    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now(); // Set creation timestamp
    }
}
