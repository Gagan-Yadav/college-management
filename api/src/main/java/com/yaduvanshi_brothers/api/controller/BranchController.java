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

    @PostMapping("/add-branch")
    public String addBranch(@RequestBody BranchDTO branchDTO) {
        BranchesEntity branchEntity = convertToEntity(branchDTO);
        branchService.addBranchService(branchEntity);
        return "branch added successfully";
    }

    @PutMapping("/edit-branch/{branchCode}")
    public void editBranch(@PathVariable String branchCode, @RequestBody BranchDTO branchDTO) {
        branchService.editBranch(branchCode, branchDTO);
    }

    @DeleteMapping("/delete-branch/{branchCode}")
    public void deleteBranch(@PathVariable String branchCode) {
        branchService.deleteBranch(branchCode);
    }

    private BranchesEntity convertToEntity(BranchDTO branchDTO) {
        BranchesEntity branch = new BranchesEntity();
        branch.setBranchCode(branchDTO.getBranchCode());
        branch.setBranchName(branchDTO.getBranchName());
        branch.setHodName(branchDTO.getHodName());
        branch.setSubjects(branchDTO.getSubjects());
        return branch;
    }
}
