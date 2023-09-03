package com.niit.bej.kanban.board.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

@WebFilter(urlPatterns = {"/api/v1/*"})
public class JwtFilter extends HttpFilter {
    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        ServletOutputStream responseOutputStream = response.getOutputStream();
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            responseOutputStream.println("Authorization Header Missing!!");
            responseOutputStream.close();
            response.setStatus(SC_UNAUTHORIZED);
        } else {
            String jsonWebToken = authorizationHeader.substring("Bearer ".length());
            Claims claims = Jwts.parser().setSigningKey("password").parseClaimsJws(jsonWebToken).getBody();
            request.setAttribute("claims", claims);
        }
        chain.doFilter(request, response);
    }
}
