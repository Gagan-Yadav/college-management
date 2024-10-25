package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.DTOs.EmailRequestDTO;
import com.yaduvanshi_brothers.api.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/send-mail")
public class EmailSendingController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public String sendEmailController(@RequestBody EmailRequestDTO emailRequestDTO){
        String to = emailRequestDTO.getTo();
        String subject = emailRequestDTO.getSubject();
        String body = emailRequestDTO.getBody();
        emailService.sendMailService(to,subject,body);
        return "email sent successfully";
    }
}
