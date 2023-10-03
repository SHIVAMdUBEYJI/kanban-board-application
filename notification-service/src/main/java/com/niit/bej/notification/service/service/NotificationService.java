package com.niit.bej.notification.service.service;

import com.niit.bej.notification.service.model.Notification;

public interface NotificationService {
    Notification saveNotification(Notification notification);

    Notification getByEmail(String email);

    Notification updateNotification(Notification notification);

    void deleteNotification(String email);
}
