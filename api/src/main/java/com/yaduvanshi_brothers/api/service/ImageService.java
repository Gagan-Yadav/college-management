package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.ImageEntity;
import com.yaduvanshi_brothers.api.repository.ImageRepository;
import com.yaduvanshi_brothers.api.utils.uploadImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public void uploadImageService(MultipartFile file) throws IOException {
        ImageEntity imageData = imageRepository.save(ImageEntity.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(uploadImageUtil.compressImage(file.getBytes())).build()
        );

        if(imageData!=null){
            file.getOriginalFilename();
        }
    }

    public byte[] downloadImage(String filename) {
        Optional<ImageEntity> dbImage = imageRepository.findByName(filename);
        if (dbImage.isEmpty()) {
            return "image not found".getBytes();
        }
        return uploadImageUtil.decompressImage(dbImage.get().getImage());
    }

}
