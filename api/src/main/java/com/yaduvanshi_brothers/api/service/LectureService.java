package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    public List<LectureEntity> getAllLectures() {
        return lectureRepository.findAll();
    }

    public LectureEntity getLectureById(int id) {
        return lectureRepository.findById(id).orElse(null);
    }

    public LectureEntity createLecture(LectureEntity lecture) {
        return lectureRepository.save(lecture);
    }

    public void deleteLecture(int id) {
        lectureRepository.deleteById(id);
    }
}
