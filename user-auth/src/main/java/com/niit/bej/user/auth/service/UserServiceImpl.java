package com.niit.bej.user.auth.service;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;
import com.niit.bej.user.auth.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) throws UserAlreadyExistsException {
        Optional<User> optionalUser = this.userRepository.findUserByUsername(user.getUsername());
        if (optionalUser.isPresent()) {
            throw new UserAlreadyExistsException("username is taken! ");
        }
        return this.userRepository.save(user);

    }

    @Override
    public boolean login(User user) throws UserNotFoundException {
        Optional<User> optionalUser = this.userRepository.findUserByUsername(user.getUsername());
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException("username not found! ");
        } else {
            User userFromDatabase = optionalUser.get();
            return user.getUsername().equals(userFromDatabase.getUsername()) && user.getPassword().equals(userFromDatabase.getPassword());

        }
    }


}
