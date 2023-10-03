package com.niit.bej.user.auth.controller;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;
import com.niit.bej.user.auth.service.security.JwtSecurityTokenGenerator;
import com.niit.bej.user.auth.service.security.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            return new ResponseEntity<>(this.userService.register(user), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException exception) {
            throw new UserAlreadyExistsException("already exists");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/guard/update/{email}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable String email) {
        return new ResponseEntity<>(this.userService.updateUser(user, email), HttpStatus.OK);
    }

    @DeleteMapping("/guard/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        this.userService.deleteUser(email);
        return new ResponseEntity<>("User Deleted Successfully", HttpStatus.OK);
    }

    @GetMapping("/guard/email/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) throws UserNotFoundException {
        try {
            return new ResponseEntity<>(this.userService.findUserByEmail(email), HttpStatus.OK);
        } catch (UserNotFoundException exception) {
            throw new UserNotFoundException("not found");
        } catch (Exception exception) {
            return new ResponseEntity<>("Network error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/guard/all-emails")
    public ResponseEntity<?> getAllEmails() {
        return new ResponseEntity<>(this.userService.findAllEmails(), HttpStatus.OK)
    }

}
