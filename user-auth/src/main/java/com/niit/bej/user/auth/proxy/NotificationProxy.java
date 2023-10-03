package com.niit.bej.user.auth.proxy;

import com.niit.bej.user.auth.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service",url = "notification-service:8084")
public interface NotificationProxy {
    @PostMapping("/notification/saveNotification")
    ResponseEntity<?> saveNotification(@RequestBody User user);
}
