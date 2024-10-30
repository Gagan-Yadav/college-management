package com.yaduvanshi_brothers.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EmailRequestEntity {
    private String to;
    private List<String> cc;
    private List<String> bcc;
    private String subject;
    private String body;
    private List<String> attachments; // Paths of attachments
}
