package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping("/add")
    public String addFacultyController(@RequestBody FacultyEntity facultyEntity){
        facultyService.addFacultyService(facultyEntity);
        return "faculty added successfully";
    }

    @GetMapping
    public List<FacultyEntity> allFacultiesController(){
        return facultyService.allFacultyService();
    }
}
