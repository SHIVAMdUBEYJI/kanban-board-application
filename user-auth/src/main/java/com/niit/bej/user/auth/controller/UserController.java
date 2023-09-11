package com.niit.bej.user.auth.controller;

import com.niit.bej.user.auth.exception.InvalidCredentialsException;
import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;
import com.niit.bej.user.auth.service.UserService;
import com.niit.bej.user.auth.service.security.SecurityTokenGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;
    private final SecurityTokenGenerator securityTokenGenerator;

    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = this.userService.register(user);
            return new ResponseEntity<>(registeredUser + "created", HttpStatus.CREATED);
        } catch (UserAlreadyExistsException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            boolean loginUser = this.userService.login(user);
            if (loginUser) {
                Map<String, String> jwtTokenMap = securityTokenGenerator.generateToken(user);
                return new ResponseEntity<>(jwtTokenMap, HttpStatus.OK);
            } else throw new InvalidCredentialsException("Please check your Username and Password");
        } catch (InvalidCredentialsException | UserNotFoundException exception) {
            return new ResponseEntity<>("Please check your credentials", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRegisteredUsers() {
        try {
            List<User> userList = this.userService.getAllUsers();
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (UserNotFoundException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
