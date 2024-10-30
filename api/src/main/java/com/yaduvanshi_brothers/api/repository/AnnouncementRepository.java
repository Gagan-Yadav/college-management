package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.AnnouncementEntity;
import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer> {
    List<AnnouncementEntity> findByBranch(BranchesEntity branch);
}
