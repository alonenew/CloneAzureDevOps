package com.clone_azuredevops.be.security.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.clone_azuredevops.be.constant.Authority;
import com.clone_azuredevops.be.constant.StatusCode;
import com.clone_azuredevops.be.model.common.ErrorResponse;
import com.clone_azuredevops.be.security.config.util.JwtUtil;


@Component
public class JwtFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                String jwtToken = request.getHeader(Authority.AUTHORIZATION);
                if((jwtToken != null) && (jwtToken.startsWith(Authority.BEARER))) {
                    jwtToken = jwtToken.substring(7);
                    try {
                        jwtUtil.validateToken(jwtToken);
                    } catch(Exception e){
                        ObjectMapper objectMapper = new ObjectMapper();
                        ErrorResponse<Object> errorResponse = new ErrorResponse<Object>(StatusCode.ERR_CODE_401, StatusCode.ERR_DESC_401);
                        String errorResponseJson = objectMapper.writeValueAsString(errorResponse);
                        response.setContentType("application/json");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write(errorResponseJson);
                        return;
                    }

                    String email = jwtUtil.getEmailFromJwt(jwtToken);
                    if((email != null) && (SecurityContextHolder.getContext().getAuthentication() == null)) {
                        List<GrantedAuthority> authorities = new ArrayList<>();
                        authorities.add(new SimpleGrantedAuthority(Authority.CUSTOMER));
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, "(protected)", authorities);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
                filterChain.doFilter(request, response);
    }
    
}
