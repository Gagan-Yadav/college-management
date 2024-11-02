package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.ImageEntity;
import com.yaduvanshi_brothers.api.repository.ImageRepository;
import com.yaduvanshi_brothers.api.utils.UploadImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public ImageEntity uploadImageService(MultipartFile file) throws IOException {
        ImageEntity imageData = imageRepository.save(ImageEntity.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(UploadImageUtil.compressImage(file.getBytes())).build()
        );

        return imageData; // Return the saved ImageEntity
    }


    public byte[] downloadImageService(Long filename) {
        Optional<ImageEntity> dbImage = imageRepository.findById(filename);
        if (dbImage.isEmpty()) {
            return "image not found".getBytes();
        }
        return UploadImageUtil.decompressImage(dbImage.get().getImage());
    }

    public byte[] downloadImageById(Long id) {
        Optional<ImageEntity> dbImage = imageRepository.findById(id); // Fetch by ID
        if (dbImage.isEmpty()) {
            return new byte[0]; // Return empty byte array if image not found
        }
        return UploadImageUtil.decompressImage(dbImage.get().getImage());
    }


}
