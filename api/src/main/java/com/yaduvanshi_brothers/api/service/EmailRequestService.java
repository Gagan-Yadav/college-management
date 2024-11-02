package com.yaduvanshi_brothers.api.service;

import com.yaduvanshi_brothers.api.entity.EmailRequestEntity;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.File;
import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class EmailRequestService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailRequestEntity emailRequest) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(emailRequest.getTo());
        if (emailRequest.getCc() != null) {
            helper.setCc(emailRequest.getCc().toArray(new String[0]));
        }
        if (emailRequest.getBcc() != null) {
            helper.setBcc(emailRequest.getBcc().toArray(new String[0]));
        }
        helper.setSubject(emailRequest.getSubject());
        helper.setText(emailRequest.getBody(), true);

        if (emailRequest.getAttachments() != null) {
            for (String filePath : emailRequest.getAttachments()) {
                File file = new File(filePath);
                helper.addAttachment(file.getName(), file);
            }
        }

        mailSender.send(mimeMessage);
    }

    public void scheduleEmail(EmailRequestEntity emailRequest, LocalDateTime scheduleTime) {
        long delay = java.time.Duration.between(LocalDateTime.now(), scheduleTime).toMillis();

        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    sendEmail(emailRequest);
                } catch (MessagingException e) {
                    e.printStackTrace();
                } catch (jakarta.mail.MessagingException e) {
                    throw new RuntimeException(e);
                }
            }
        }, delay);
    }
}
