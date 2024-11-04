package com.yaduvanshi_brothers.api.config;

import com.yaduvanshi_brothers.api.filter.JwtFilter;
import com.yaduvanshi_brothers.api.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

    @Autowired
    private CustomUserService customUserService;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("spring security starting Gagan ....");

        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // Enables CORS with custom configuration
                .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for simplicity
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/public/**").permitAll()
                        .requestMatchers("/admin/**", "/branch/**", "/faculty/**", "/student/**", "/lectures/**", "/send-mail/**", "/image/**", "/online-classes/**", "/announcements/**", "/one-time-mail/**", "/assignments/**", "/files/**").hasRole("ADMIN")
                        .requestMatchers("/branch/**", "/faculty/**", "/student/**", "/lectures/**", "/send-mail/**", "/image/**", "/online-classes/**", "/announcements/**", "/one-time-mail/**", "/assignments/**", "/files/**").hasRole("FACULTY")
                        .requestMatchers("/student/**", "/lectures/**", "/files/**").hasRole("STUDENT")
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)  // JWT filter
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:3001",
            "https://college-management-eight.vercel.app",
            "https://college-management-0127cs211009-gmailcoms-projects.vercel.app",
            "https://college-management-git-main-0127cs211009-gmailcoms-projects.vercel.app",
            "https://college-management-1-oxjm.onrender.com"  // Backend URL added for CORS
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin", "Cache-Control", "Pragma"));
        configuration.setAllowCredentials(true);
        configuration.addExposedHeader("Content-Disposition");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        System.out.println("spring password generated ....");
        System.out.println("password encoder " + new BCryptPasswordEncoder());
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
