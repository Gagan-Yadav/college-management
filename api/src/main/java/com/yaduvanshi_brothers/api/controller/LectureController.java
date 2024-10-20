package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.LectureDTO;
import com.yaduvanshi_brothers.api.entity.LectureEntity;
import com.yaduvanshi_brothers.api.entity.StudentEntity;
import com.yaduvanshi_brothers.api.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/lectures")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @GetMapping("/get-all-lectures")
    public List<LectureDTO> getAllLectures() {
        List<LectureEntity> lectures = lectureService.getAllLectures();

        return lectures.stream().map(lecture -> {
            LectureDTO dto = new LectureDTO();
            dto.setLectureId(lecture.getLectureId());
            dto.setYear(lecture.getYear());
            dto.setSemester(lecture.getSemester());
            dto.setDepartment(lecture.getDepartment());
            dto.setSubject(lecture.getSubject());
            dto.setStartFrom(lecture.getStartFrom());
            dto.setTill(lecture.getTill());
            dto.setFacultyName(lecture.getFacultyName());
            dto.setRoomNumber(lecture.getRoomNumber());
            dto.setFacultyId(lecture.getFaculty() != null ? lecture.getFaculty().getFacultyId() : null);
            dto.setStudentIds(lecture.getStudents().stream().map(StudentEntity::getStudentId).collect(Collectors.toList()));
            return dto;
        }).collect(Collectors.toList());
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<LectureEntity> getLectureById(@PathVariable int id) {
//        LectureEntity lecture = lectureService.getLectureById(id);
//        return lecture != null ? ResponseEntity.ok(lecture) : ResponseEntity.notFound().build();
//    }

    @PostMapping
    public ResponseEntity<?> createLecture(@RequestBody LectureEntity lecture) {
        LectureEntity createdLecture = lectureService.createLecture(lecture);
        return ResponseEntity.status(HttpStatus.CREATED).body("lecture created");
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteLecture(@PathVariable int id) {
//        lectureService.deleteLecture(id);
//        return ResponseEntity.noContent().build();
//    }
}
