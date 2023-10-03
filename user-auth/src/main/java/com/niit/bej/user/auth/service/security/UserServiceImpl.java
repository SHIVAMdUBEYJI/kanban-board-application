package com.niit.bej.user.auth.service.security;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;

import java.util.List;

public class UserServiceImpl implements UserService {
    @Override
    public User register(User user) throws UserAlreadyExistsException {
        return null;
    }

    @Override
    public User updateUser(User user, String email) {
        return null;
    }

    @Override
    public void deleteUser(String email) {

    }

    @Override
    public void login(String email, String password) throws UserNotFoundException {

    }

    @Override
    public User findUserByEmail(String email) throws UserNotFoundException {
        return null;
    }

    @Override
    public List<String> findAllEmails() {
        return null;
    }
}
