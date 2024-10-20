package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.BranchesEntity;
import com.yaduvanshi_brothers.api.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public void addBranchService(BranchesEntity branchesEntity){
        branchRepository.save(branchesEntity);
    }

    public List<BranchesEntity> allBranchService(){
        return branchRepository.findAll();
    }

}