package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByusername(String username);
}
