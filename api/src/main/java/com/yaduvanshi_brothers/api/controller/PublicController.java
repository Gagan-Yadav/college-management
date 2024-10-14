package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.service.CustomUserService;
import com.yaduvanshi_brothers.api.service.ImageService;
import com.yaduvanshi_brothers.api.service.UserService;
import com.yaduvanshi_brothers.api.utils.JwtUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @GetMapping("/health-check")
    public ResponseEntity<?> healthCheckController(){
        return  ResponseEntity.status(HttpStatus.OK).body("server is working fine");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity userDta){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDta.getUserName(),userDta.getPassword()));
            UserDetails userDetails = customUserService.loadUserByUsername(userDta.getUserName());
            String jwt = jwtUtility.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch(Exception e){
            log.error("failed to login",e);
            return new ResponseEntity<>("Incorrect username or password",HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/upload")
    public String uploadImageIndb(@RequestPart("image") MultipartFile file) throws IOException {
        imageService.uploadImageService(file);
        return  "image uploaded successfully";
    }

    @GetMapping("/{filename}")
    public ResponseEntity<?> downloadImage(@PathVariable String filename) {
        byte[] imageData = imageService.downloadImage(filename);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }


}
