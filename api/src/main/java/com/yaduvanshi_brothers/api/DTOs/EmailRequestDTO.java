package com.yaduvanshi_brothers.api.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequestDTO {
        private String to;
        private String subject;
        private String body;
}
