package com.yaduvanshi_brothers.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all paths
                .allowedOrigins("http://localhost:3000") // Specify allowed origins
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed methods
                .allowedHeaders("*") // Allow any headers
                .allowCredentials(true); // Allow sending credentials like cookies
    }
}
