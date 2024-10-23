package com.yaduvanshi_brothers.api.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByusername(username);

        if (user != null) {
            // Convert List<String> roles to String[] for Spring Security
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRoles()) // Use the roles array
                    .build();
        }
        throw new UsernameNotFoundException("User not found: " + username);
    }
}
