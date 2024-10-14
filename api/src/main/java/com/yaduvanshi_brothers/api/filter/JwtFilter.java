package com.yaduvanshi_brothers.api.filter;

import com.yaduvanshi_brothers.api.service.CustomUserService;
import com.yaduvanshi_brothers.api.utils.JwtUtility;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserService customUserService;

    @Autowired
    private JwtUtility jwtUtility;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            String authorizationHeader = request.getHeader("Authorization");
            String userName = null;
            String jwt = null;
            if(authorizationHeader!=null && authorizationHeader.startsWith("Bearer ")){
                jwt = authorizationHeader.substring(7);
                userName = jwtUtility.extractUsername(jwt);
            }

            if(userName!=null){
                UserDetails userDetails = customUserService.loadUserByUsername(userName);
                System.out.println(userDetails);
                if(jwtUtility.validateToken(jwt)){
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        filterChain.doFilter(request,response);
    }


}
