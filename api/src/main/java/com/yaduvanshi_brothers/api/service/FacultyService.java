package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;

    public void addFacultyService(FacultyEntity facultyEntity){
        facultyRepository.save(facultyEntity);
    }

    public List<FacultyEntity> allFacultyService(){
        return facultyRepository.findAll();
    }
}