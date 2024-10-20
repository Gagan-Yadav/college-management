package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-all-users-on-this-website")
    public ResponseEntity<List<UserEntity>> userListController(){
        List<UserEntity> allUsers = userService.allUsersService();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @PostMapping("/add-user")
    public ResponseEntity<String> userUserByAdminController(@RequestBody UserEntity userEntity){
        userService.adduserByAdminService(userEntity);
        return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
    }

    @PatchMapping("/update-user-by-id/{id}")
    public ResponseEntity<String> updateUserByIdController(@RequestBody UserEntity updatedData, @PathVariable int id){
        Optional<UserEntity> user = userService.findByuserByIdService(id);
        if(user.isPresent()){
            UserEntity userInDB = user.get();
            userInDB.setUsername(updatedData.getUsername());
            userInDB.setPassword(updatedData.getPassword());
            userInDB.setRoles(updatedData.getRoles());
            userService.updateUserService(userInDB);
            return new ResponseEntity<>("User updated successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete-user-by-id/{id}")
    public ResponseEntity<String> deleteUserByIdController(@PathVariable int id){
        Optional<UserEntity> user = userService.findByuserByIdService(id);
        if(user.isPresent()){
            userService.deleteUserByIdService(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("User not exist", HttpStatus.NOT_FOUND);
    }
}
