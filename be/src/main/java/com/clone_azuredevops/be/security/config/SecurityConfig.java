package com.clone_azuredevops.be.security.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.clone_azuredevops.be.security.filter.JwtFilter;


@Configurable
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // @Bean
    // public PasswordEncoder passwordEncoder(){
    //     return new BCryptPasswordEncoder();
    // }

    @Bean
    public JwtFilter jwtFilterBean() throws Exception{
        return new JwtFilter();
    }

    String register = "/**/api/users/register";
    String relogin = "/**/api/users/relogin";
    String customerid = "/**/api/users/customerid";
    String login = "/**/api/users/login";
    String addtask = "/**/api/tasks/addtask";
    String gettask = "/**/api/tasks/gettask";
    String remove = "/**/api/tasks/remove";
    String update = "/**/api/tasks/update";
    String gettaskid = "/**/api/tasks/gettaskid";
    String adddetail = "/**/api/tasks/adddetail";
    String deleteDiscusById = "/**/api/tasks/deleteDiscusById";
    String customerall = "/**/api/users/customerall";
    String updateDiscusById = "/**/api/tasks/updateDiscusById";
    String getDiscus = "/**/api/tasks/getDiscus";
    String updateAssign = "/**/api/tasks/updateAssign";
    String getRelation = "/**/api/relation/getRelation";
    String addRelation = "/**/api/relation/addRelation";
 
    @Override
    protected void configure (HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests().antMatchers(updateAssign,updateDiscusById,addRelation,getRelation,
            getDiscus,register,login,relogin,addtask,gettask,remove,update,gettaskid,adddetail,customerid,deleteDiscusById,customerall).anonymous()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }
}
