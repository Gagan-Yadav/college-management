package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping
    public String uploadImageIndb(@RequestPart("image")MultipartFile file) throws IOException {
        imageService.uploadImageService(file);
        return  "image uploaded successfully";
    }

    @GetMapping("/{filename}")
    public ResponseEntity<?> downloadImage(@PathVariable Long filename) {
        byte[] imageData = imageService.downloadImageService(filename);

        if (imageData.length == 0) {
            return ResponseEntity.notFound().build(); // Handle image not found
        }
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("image/png")) // Set the correct content type
                .body(imageData);
    }
    }

