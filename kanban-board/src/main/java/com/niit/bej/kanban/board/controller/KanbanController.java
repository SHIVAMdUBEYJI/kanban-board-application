package com.niit.bej.kanban.board.controller;

import com.niit.bej.kanban.board.exception.KanbanAlreadyExistsException;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.service.KanbanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class KanbanController {

    private final KanbanService kanbanService;

    public KanbanController(KanbanService kanbanService) {
        this.kanbanService = kanbanService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> createKanban(@RequestBody Kanban kanban) {
        try {
            Kanban createdkanban = this.kanbanService.saveKanban(kanban);
            return new ResponseEntity<>(createdkanban, HttpStatus.OK);
        } catch (KanbanAlreadyExistsException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
