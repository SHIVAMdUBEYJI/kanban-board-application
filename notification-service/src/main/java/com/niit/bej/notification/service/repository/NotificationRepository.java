package com.niit.bej.notification.service.repository;

import com.niit.bej.notification.service.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification,String> {

    Notification findByEmail(String email);
}
