package com.clone_azuredevops.be.security.config.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.clone_azuredevops.be.constant.StatusCode;
import com.clone_azuredevops.be.exception.BaseException;

@Component
public class JwtUtil {

    @Value("${app.jwt.secrete}")
    private String secrete;
    @Value("${app.jwt.expired}")
    private String expired;

    public String generateToken(String data){
        Date expiryDate = new Date(System.currentTimeMillis() + 1000 * 60 * Integer.parseInt(expired));
        String token = Jwts.builder()
            .setSubject(data)
            .setIssuedAt(new Date())
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS256, secrete)
            .compact();
        return token;
    }

    public void validateToken (String token){
        try{
        Jwts.parser().setSigningKey(secrete).parseClaimsJws(token);
        }catch(ExpiredJwtException ex){
            throw new BaseException(HttpStatus.UNAUTHORIZED, StatusCode.ERR_CODE_401, StatusCode.ERR_CODE_401);
        }catch(Exception ex){
            throw new BaseException(HttpStatus.UNAUTHORIZED, StatusCode.ERR_CODE_401, StatusCode.ERR_CODE_401);
        }
    }

    public String getEmailFromJwt(String token){
        return Jwts.parser()
                    .setSigningKey(secrete)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
    }   
}
