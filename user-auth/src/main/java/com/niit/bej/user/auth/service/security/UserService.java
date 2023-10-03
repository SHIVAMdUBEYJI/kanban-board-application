package com.niit.bej.user.auth.service.security;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;

import java.util.List;

public interface UserService {
    User register(User user) throws UserAlreadyExistsException;

    User updateUser(User user,String email);

    void deleteUser(String email);

    void login(String email,String password) throws UserNotFoundException;

    User findUserByEmail(String email) throws UserNotFoundException;

    List<String> findAllEmails();

}
