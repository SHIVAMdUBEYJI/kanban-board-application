package com.niit.bej.notification.service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document
public class Notification {
    @Id
    private String email;
    private List<Message> messages;

    public Notification(){
        this.messages = new ArrayList<>();
    }

}

