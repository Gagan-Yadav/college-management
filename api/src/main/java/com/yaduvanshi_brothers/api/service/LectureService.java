package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    public Page<LectureEntity> getAllLectures(PageRequest pageRequest) {
        return lectureRepository.findAll(pageRequest);
    }

    public LectureEntity getLectureById(int id) {
        return lectureRepository.findById(id).orElse(null);
    }

    public List<LectureEntity> findLecturesBySubject(String subject) {
        return lectureRepository.findBySubject(subject);
    }

    public List<LectureEntity> sortLectures(Sort sort) {
        return lectureRepository.findAll(sort);
    }
    public LectureEntity createLecture(LectureEntity lecture) {
        return lectureRepository.save(lecture);
    }

    public void deleteLecture(int id) {
        lectureRepository.deleteById(id);
    }
}
