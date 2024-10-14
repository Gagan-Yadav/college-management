package com.yaduvanshi_brothers.api.scheduler;

import com.yaduvanshi_brothers.api.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class UserScheduler {

    @Autowired
    private EmailService emailService;


//    @Scheduled(cron = "0/5 * * * * ?")
    @Scheduled(cron = "0 0 9 * * SUN")
    public void sendAutomaticEmailToUser(){
            System.out.println("cron is running...");
            emailService.sendMailService("yaman49751@gmail.com","Important Info","Hello aman how are you, tomorrow will be your interview...");
    }
}
