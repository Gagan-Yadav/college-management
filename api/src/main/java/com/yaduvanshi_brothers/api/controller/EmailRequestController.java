package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.EmailRequestEntity;
import com.yaduvanshi_brothers.api.service.EmailRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/one-time-mail")
public class EmailRequestController {

    @Autowired
    private EmailRequestService emailRequestService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequestEntity emailRequest) {
        try {
            emailRequestService.sendEmail(emailRequest);
            return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            return new ResponseEntity<>("Failed to send email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/schedule")
    public ResponseEntity<String> scheduleEmail(@RequestBody EmailRequestEntity emailRequest,
                                                @RequestParam("scheduledTime") String scheduledTime) {
        try {
            LocalDateTime scheduleDateTime = LocalDateTime.parse(scheduledTime);
            emailRequestService.scheduleEmail(emailRequest, scheduleDateTime);
            return new ResponseEntity<>("Email scheduled successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to schedule email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
