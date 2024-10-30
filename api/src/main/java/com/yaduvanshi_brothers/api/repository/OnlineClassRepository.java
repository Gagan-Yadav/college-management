package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.OnlineClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnlineClassRepository extends JpaRepository<OnlineClassEntity, Integer> {
}
