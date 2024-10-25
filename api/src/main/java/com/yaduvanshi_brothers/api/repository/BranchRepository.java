package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<BranchesEntity, String> {
    Optional<BranchesEntity> findByBranchCode(String branchCode);
}
