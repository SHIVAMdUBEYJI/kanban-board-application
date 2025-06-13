package com.niit.bej.kanban.board.controller;

import com.niit.bej.kanban.board.configuration.MessageDTO;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.service.KanbanService;
import com.niit.bej.kanban.board.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kanban")
public class KanbanController {
    private final KanbanService kanbanService;
    private final MessageService messageService;

    @Autowired
    public KanbanController(KanbanService kanbanService, MessageService messageService) {
        this.kanbanService = kanbanService;
        this.messageService = messageService;
    }

    @PostMapping("/save-kanban")
    public ResponseEntity<?> saveKanban(@RequestBody Kanban kanban) {
        return new ResponseEntity<>(this.kanbanService.saveKanban(kanban), HttpStatus.CREATED);
    }

    @GetMapping("/get-kanban/{email}")
    public ResponseEntity<?> getKanban(@PathVariable String email) {
        return new ResponseEntity<>(this.kanbanService.getKanbanByEmail(email), HttpStatus.OK);
    }

    @PutMapping("/update-kanban")
    public ResponseEntity<?> updateKanban(@RequestBody Kanban kanban) {
        return new ResponseEntity<>(this.kanbanService.updateKanban(kanban), HttpStatus.OK);
    }

    @DeleteMapping("/delete-kanban/{email}")
    public ResponseEntity<?> deleteKanban(@PathVariable String email) {
        this.kanbanService.deleteKanbanByEmail(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/send-message")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO messageDTO) {
        return new ResponseEntity<>(this.messageService.sendMessage(messageDTO), HttpStatus.OK);
    }

    @PutMapping("/add-member-to-board/{email}")
    public ResponseEntity<?> addMemberToBoardByEmail(@RequestBody Kanban kanban, @PathVariable String email) {
        return new ResponseEntity<>(this.kanbanService.addMemberToBoardByEmail(kanban, email), HttpStatus.OK);
    }

    @GetMapping("/all-emails-in-board/{email}/{boardName}")
    public ResponseEntity<?> getAllEmailsInBoard(@PathVariable String email, @PathVariable String boardName) {
        return new ResponseEntity<>(this.kanbanService.getAllEmailsInBoard(email, boardName), HttpStatus.OK);
    }
}
