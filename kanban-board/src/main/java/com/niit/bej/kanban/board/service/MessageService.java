package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.configuration.MessageDTO;

public interface MessageService {

    MessageDTO sendMessage(MessageDTO messageDTO);
}
