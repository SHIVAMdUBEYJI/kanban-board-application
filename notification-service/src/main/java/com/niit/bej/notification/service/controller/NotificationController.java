package com.niit.bej.notification.service.controller;

import com.niit.bej.notification.service.model.Notification;
import com.niit.bej.notification.service.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notification")
public class NotificationController {
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("saveNotification")
    public ResponseEntity<?> saveNotification(@RequestBody Notification notification) {
        return new ResponseEntity<>(this.notificationService.saveNotification(notification), HttpStatus.CREATED);
    }

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<?> getByEmailId(@PathVariable String email) {
        return new ResponseEntity<>(this.notificationService.getByEmail(email), HttpStatus.OK);
    }

    @PutMapping("/updateNotification")
    public ResponseEntity<?> updateNotification(@RequestBody Notification notification) {
        return new ResponseEntity<>(this.notificationService.updateNotification(notification), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteNotification(@PathVariable String email) {
        this.notificationService.deleteNotification(email);
        return new ResponseEntity<>("User Notification Successfully", HttpStatus.OK);
    }
}
