package com.niit.bej.user.auth.service;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;

import java.util.List;

public interface UserService {

User register(User user) throws UserAlreadyExistsException;

boolean login(User user) throws UserNotFoundException;

List<User> getAllUsers() throws UserNotFoundException;

}
