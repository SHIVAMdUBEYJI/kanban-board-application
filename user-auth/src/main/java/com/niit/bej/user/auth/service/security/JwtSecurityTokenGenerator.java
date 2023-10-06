package com.niit.bej.user.auth.service.security;

import com.niit.bej.user.auth.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtSecurityTokenGenerator implements SecurityTokenGenerator {
    @Override
    public Map<String, String> generateToken(User user) {
        String jwtToken;
        jwtToken = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "secretKey") // Verify Signature
                .compact();

        Map<String, String> map = new HashMap<>();
        map.put("token", jwtToken);
        map.put("message", "User Successfully logged in");
        return map;
    }
}
