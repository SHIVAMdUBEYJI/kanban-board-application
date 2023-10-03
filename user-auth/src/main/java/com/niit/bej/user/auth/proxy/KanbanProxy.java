package com.niit.bej.user.auth.proxy;

import com.niit.bej.user.auth.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
@FeignClient(name = " kanban-board-service",url = " kanban-board-service:8082")
public interface KanbanProxy {
    @PostMapping("kanban/save-kanban")
    ResponseEntity<?> saveKanban(@RequestBody User user);
}
