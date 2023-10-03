package com.niit.bej.user.auth.controller;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.model.User;
import com.niit.bej.user.auth.service.security.JwtSecurityTokenGenerator;
import com.niit.bej.user.auth.service.security.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class UserController {
    private final UserServiceImpl userService;
    private final JwtSecurityTokenGenerator jwtSecurityTokenGenerator;


    @Autowired
    public UserController(UserServiceImpl userService, JwtSecurityTokenGenerator jwtSecurityTokenGenerator) {
        this.userService = userService;
        this.jwtSecurityTokenGenerator = jwtSecurityTokenGenerator;
    }

    public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            return new ResponseEntity<>(this.userService.register(user), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException exception) {
            throw new UserAlreadyExistsException("already exists");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
