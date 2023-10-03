package com.niit.bej.kanban.board.configuration;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    private final RabbitTemplate RABBIT_TEMPLATE;

    private final DirectExchange DIRECT_EXCHANGE;

    public Producer(RabbitTemplate rabbitTemplate, DirectExchange directExchange) {
        RABBIT_TEMPLATE = rabbitTemplate;
        DIRECT_EXCHANGE = directExchange;
    }

    public void sendMessage(MessageDTO messageDTO){
      RABBIT_TEMPLATE.convertAndSend(DIRECT_EXCHANGE.getName(),MessageConfig.MESSAGE_KEY,messageDTO);
    }
}
