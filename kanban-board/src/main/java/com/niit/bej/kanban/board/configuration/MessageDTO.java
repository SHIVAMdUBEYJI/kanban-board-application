package com.niit.bej.kanban.board.configuration;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class MessageDTO {
    private String email;
    private String message;
}
