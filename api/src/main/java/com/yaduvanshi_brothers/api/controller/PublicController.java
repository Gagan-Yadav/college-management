package com.yaduvanshi_brothers.api.controller;

import com.yaduvanshi_brothers.api.entity.FacultyEntity;
import com.yaduvanshi_brothers.api.entity.UserEntity;
import com.yaduvanshi_brothers.api.service.CustomUserService;
import com.yaduvanshi_brothers.api.service.FacultyService;
import com.yaduvanshi_brothers.api.service.ImageService;
import com.yaduvanshi_brothers.api.service.UserService;
import com.yaduvanshi_brothers.api.utils.JwtUtility;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserService customUserService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private ImageService imageService;

    @Autowired
    private FacultyService facultyService;

    @GetMapping("/health-check")
    public ResponseEntity<?> healthCheckController(){
        return  ResponseEntity.status(HttpStatus.OK).body("server is working fine");
    }

    @GetMapping("/get-all-users-on-this-website")
    public ResponseEntity<List<UserEntity>> userListController(){
        List<UserEntity> allUsers = userService.allUsersService();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity userData, HttpServletResponse response) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userData.getUsername(), userData.getPassword())
            );

            // Load user details
            UserDetails userDetails = customUserService.loadUserByUsername(userData.getUsername());

            // Generate JWT token
            String jwt = jwtUtility.generateToken(userDetails.getUsername());

            // Get the user's role (assuming it's available in UserDetails or through your service)
            String role = userDetails.getAuthorities().stream()
                    .findFirst().orElseThrow().getAuthority();  // Fetch the first role, or handle as per your requirement

            // Create a cookie to store the JWT
            // Create a cookie to store the JWT
            Cookie jwtCookie = new Cookie("jwt", jwt);
            jwtCookie.setHttpOnly(true); // Optional: makes the cookie HTTP only
            jwtCookie.setSecure(false); // Set to true if you're using HTTPS
            jwtCookie.setPath("/**"); // Make sure it’s accessible in all paths
            jwtCookie.setMaxAge(86400);// Set the expiration time (in seconds)
            response.addCookie(jwtCookie); // Add to response
// 1 day expiration (24 hours)
// jwtCookie.setSameSite("None"); // Set SameSite for cross-origin

// Add the JWT cookie to the response


// Create a cookie to store the username
            Cookie usernameCookie = new Cookie("username", userDetails.getUsername());
            usernameCookie.setSecure(false); // Set true if using HTTPS
            usernameCookie.setHttpOnly(false); // Username cookie can be accessed client-side
            usernameCookie.setPath("/**");
            usernameCookie.setMaxAge(86400); // 1 day expiration (24 hours)
// usernameCookie.setSameSite("None"); // Set SameSite for cross-origin

// Add the username cookie to the response
            response.addCookie(usernameCookie);

// Create a cookie to store the user role
            Cookie roleCookie = new Cookie("role", role);
            roleCookie.setSecure(false); // Set true if using HTTPS
            roleCookie.setHttpOnly(false); // Role cookie can be accessed client-side
            roleCookie.setPath("/**");
            roleCookie.setMaxAge(86400); // 1 day expiration (24 hours)
// roleCookie.setSameSite("None"); // Set SameSite for cross-origin

// Add the role cookie to the response
            response.addCookie(roleCookie);


            // Return success response
            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear JWT Cookie
        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0); // Expire the cookie immediately
        jwtCookie.setHttpOnly(false);
        response.addCookie(jwtCookie);

        // Clear Username Cookie
        Cookie usernameCookie = new Cookie("username", null);
        usernameCookie.setPath("/");
        usernameCookie.setMaxAge(0); // Expire the cookie immediately
        usernameCookie.setHttpOnly(false);
        response.addCookie(usernameCookie);

        // Clear Role Cookie
        Cookie roleCookie = new Cookie("role", null);
        roleCookie.setPath("/");
        roleCookie.setMaxAge(0); // Expire the cookie immediately
        roleCookie.setHttpOnly(false);
        response.addCookie(roleCookie);

        // Additional cleanup can be done here (e.g., invalidating session)

        return ResponseEntity.ok("Logout successful...");
    }



    @PostMapping("/add-user")
    public ResponseEntity<String> userUserByAdminController(@RequestBody UserEntity userEntity){
        userService.adduserByAdminService(userEntity);
        return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
    }

}