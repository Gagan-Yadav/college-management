package com.yaduvanshi_brothers.api.repository;

import com.yaduvanshi_brothers.api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByuserName(String username);
}
