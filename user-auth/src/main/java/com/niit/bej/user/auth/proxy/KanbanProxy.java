package com.niit.bej.user.auth.proxy;

import com.niit.bej.user.auth.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient
public interface KanbanProxy {

    ResponseEntity<?> saveKanban(@RequestBody User user);
}
