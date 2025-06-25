package com.niit.bej.notification.service.domain;

import lombok.Data;

@Data
public class Sms {
    private String message;
    private String destinationNumber;

}
