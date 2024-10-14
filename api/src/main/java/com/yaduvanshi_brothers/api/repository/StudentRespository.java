package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRespository extends JpaRepository<StudentEntity,Integer> {

}
