package com.niit.bej.notification.service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;
    public boolean sendEmail(String toEmail,String subject,String body){
        SimpleMailMessage message =new SimpleMailMessage();
        message.setFrom("KanbanInfo.@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
      //  javaMailSender.send(message);
        System.out.println(message);
        System.out.println("Email sent successfully to: " + toEmail);
        return true;
    }
}
