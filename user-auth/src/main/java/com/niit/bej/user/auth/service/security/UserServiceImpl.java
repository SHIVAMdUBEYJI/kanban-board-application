package com.niit.bej.user.auth.service.security;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;
import com.niit.bej.user.auth.proxy.KanbanProxy;
import com.niit.bej.user.auth.proxy.NotificationProxy;
import com.niit.bej.user.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final KanbanProxy kanbanProxy;
    private final NotificationProxy notificationProxy;
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(KanbanProxy kanbanProxy, NotificationProxy notificationProxy, UserRepository userRepository) {
        this.kanbanProxy = kanbanProxy;
        this.notificationProxy = notificationProxy;
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) throws UserAlreadyExistsException {

        if (userRepository.existsById(user.getEmail())) {
            throw new UserAlreadyExistsException("User already found");
        }
        kanbanProxy.saveKanban(user);
        notificationProxy.saveNotification(user);
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, String email) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String email) {
       userRepository.deleteById(email);

    }

    @Override
    public void login(String email, String password) throws UserNotFoundException {
        Optional<User> userByEmailAndPassword = userRepository.findUserByEmailAndPassword(email, password);
        if (userByEmailAndPassword.isEmpty()) {
            throw new UserNotFoundException("not found");
        }
    }

    @Override
    public User findUserByEmail(String email) throws UserNotFoundException {
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("cannot find the user by this email");
        }
        return user;
    }

    @Override
    public List<String> findAllEmails() {
        List<User> userList =userRepository.findAll();
        List<String> emails = new ArrayList<>();
        for (User user : userList) {
            emails.add(user.getEmail());
        }
        return emails;
    }
}
