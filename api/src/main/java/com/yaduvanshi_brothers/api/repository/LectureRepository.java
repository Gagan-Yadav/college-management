package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity, Integer> {
}
