package com.yaduvanshi_brothers.api.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints (or specify a path if needed)
                .allowedOrigins("http://localhost:3000/") // Allow requests from your frontend domain
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowCredentials(true) // Allow cookies and credentials to be sent
                .allowedHeaders("*") // Allow all headers or specify which ones
                .exposedHeaders("Authorization") // Expose headers you might need on the frontend
                .maxAge(3600); // Cache preflight response for 1 hour
    }
}
