package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.BranchDTO;
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


    @GetMapping("/get-all-branches")
    public List<BranchDTO> getAllBranches() {
        return branchService.getAllBranches();
    }
}
