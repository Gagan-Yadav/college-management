package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

//    @PatchMapping("/{id}")
//    public ResponseEntity<?> updateUserByIdController(@RequestBody UserEntity updatedData, @PathVariable int id){
//        Optional<UserEntity> user = userService.findByuserByIdService(id);
//        if(user.isPresent()){
//            UserEntity userInDB = user.get();
//            userInDB.setUserName(updatedData.getUserName());
//            userInDB.setPassword(updatedData.getPassword());
//            userInDB.setRoles(updatedData.getRoles());
//            userService.updateUserService(userInDB);
//            return ResponseEntity.status(HttpStatus.ACCEPTED).body("user updated successfully");
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
//    }
}
