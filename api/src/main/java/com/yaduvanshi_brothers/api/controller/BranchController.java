package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/branch")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @PostMapping("/add")
    public String addBranchController(@RequestBody BranchesEntity branchData){
        branchService.addBranchService(branchData);
        return "branch added successfully";
    }

    @GetMapping
    public List<BranchesEntity> allBranchesController(){
        return branchService.allBranchService();
    }
}
