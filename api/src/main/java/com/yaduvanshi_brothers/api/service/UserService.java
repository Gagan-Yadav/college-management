package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//    public void addOrRegisterUserService(UserEntity userData){
//        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
//        userData.setRoles("USER");
//        userRepository.save(userData);
//    }
//
    public void adduserByAdminService(UserEntity userData){
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        userRepository.save(userData);
    }

    public List<UserEntity> allUsersService(){
        return userRepository.findAll();
    }

    public Optional<UserEntity> findByuserByIdService(int id){
        return userRepository.findById(id);
    }

    public void updateUserService(UserEntity userData){
        userRepository.save(userData);
    }

    public void deleteUserByIdService(int id){
        userRepository.deleteById(id);
    }
}
