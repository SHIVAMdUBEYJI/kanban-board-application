package com.niit.bej.user.auth.service.security;

import com.niit.bej.user.auth.exception.UserAlreadyExistsException;
import com.niit.bej.user.auth.exception.UserNotFoundException;
import com.niit.bej.user.auth.model.User;
import com.niit.bej.user.auth.proxy.KanbanProxy;
import com.niit.bej.user.auth.proxy.NotificationProxy;
import com.niit.bej.user.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

        if (this.userRepository.existsById(user.getEmail())) {
            throw new UserAlreadyExistsException("User already found");
        }
        kanbanProxy.saveKanban(user);
        notificationProxy.saveNotification(user);
        return userRepository.save(user);
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
