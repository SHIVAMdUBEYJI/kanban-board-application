package com.niit.bej.notification.service.configuration;

import com.niit.bej.notification.service.model.Message;
import com.niit.bej.notification.service.model.Notification;
import com.niit.bej.notification.service.service.NotificationService;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Consumer {
    private final NotificationService notificationService;

    @Autowired
    public Consumer(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @RabbitListener(queuesToDeclare = @Queue("messageQueue"))
    public void getData(MessageDTO messageDTO){
        Notification notificationByEmail = this.notificationService.getByEmail(messageDTO.getEmail());
        List<Message> messages = notificationByEmail.getMessages();
        messages.add(new Message(false, messageDTO.getMessage()));
        notificationByEmail.setMessages(messages);
        this.notificationService.saveNotification(notificationByEmail);
    }
}
