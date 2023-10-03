package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.configuration.MessageDTO;
import com.niit.bej.kanban.board.configuration.Producer;
import com.niit.bej.kanban.board.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

    private final KanbanRepository kanbanRepository;
    private final Producer producer;

    @Autowired
    public MessageServiceImpl(KanbanRepository kanbanRepository, Producer producer) {
        this.kanbanRepository = kanbanRepository;
        this.producer = producer;
    }

    @Override
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        if (this.kanbanRepository.existsById(messageDTO.getEmail())) {
            producer.sendMessage(messageDTO);
        }
        return messageDTO;
    }
}
