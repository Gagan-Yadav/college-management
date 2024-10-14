package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<FacultyEntity, Integer> {
}
