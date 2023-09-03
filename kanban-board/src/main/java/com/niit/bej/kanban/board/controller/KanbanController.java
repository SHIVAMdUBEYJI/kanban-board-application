package com.niit.bej.kanban.board.controller;

import com.niit.bej.kanban.board.service.KanbanService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class KanbanController {

    private final KanbanService kanbanService;


    public KanbanController(KanbanService kanbanService) {
        this.kanbanService = kanbanService;
    }
}
