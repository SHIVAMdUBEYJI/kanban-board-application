package com.niit.bej.notification.service.service;

import com.niit.bej.notification.service.model.Notification;
import com.niit.bej.notification.service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification saveNotification(Notification notification) {
        return this.notificationRepository.save(notification);
    }

    @Override
    public Notification getByEmail(String email) {
        return this.notificationRepository.findByEmail(email);
    }

    @Override
    public Notification updateNotification(Notification notification) {
        Notification notification1 = this.notificationRepository.findByEmail(notification.getEmail());
        if(notification1 == null){
            return null;
        }else {
            return this.notificationRepository.save(notification);
        }
    }

    @Override
    public void deleteNotification(String email) {
        this.notificationRepository.deleteById(email);
    }
}
