package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.service.CustomUserService;
import com.yaduvanshi_brothers.api.service.FacultyService;
import com.yaduvanshi_brothers.api.service.ImageService;
import com.yaduvanshi_brothers.api.service.UserService;
import com.yaduvanshi_brothers.api.utils.JwtUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserService customUserService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private ImageService imageService;

    @Autowired
    private FacultyService facultyService;

    @GetMapping("/health-check")
    public ResponseEntity<?> healthCheckController(){
        return  ResponseEntity.status(HttpStatus.OK).body("server is working fine");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity userDta){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDta.getUsername(),userDta.getPassword()));
            UserDetails userDetails = customUserService.loadUserByUsername(userDta.getUsername());
            String jwt = jwtUtility.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch(Exception e){
            log.error("failed to login",e);
            return new ResponseEntity<>("Incorrect username or password",HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add-user")
    public ResponseEntity<String> userUserByAdminController(@RequestBody UserEntity userEntity){
        userService.adduserByAdminService(userEntity);
        return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
    }

}