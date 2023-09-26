package com.niit.bej.kanban.board.controller;

import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.KanbanDTO;
import com.niit.bej.kanban.board.model.TaskDTO;
import com.niit.bej.kanban.board.service.KanbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/kanbans")
public class KanbanController {

    private final KanbanService kanbanService;

    @Autowired
    public KanbanController(KanbanService kanbanService) {
        this.kanbanService = kanbanService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllKanbans() {
        try {
            return new ResponseEntity<>(this.kanbanService.getAllKanbanBoards(), HttpStatus.OK);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getKanban(@PathVariable Long id) {
        try {
            Optional<Kanban> optionalKanban = kanbanService.getKanbanById(id);
            if (optionalKanban.isPresent()) {
                return new ResponseEntity<>(optionalKanban.get(), HttpStatus.OK);
            } else {
                return noKanbanFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("/title")
    public ResponseEntity<?> getKanbanByTitle(@RequestParam String title) {
        try {
            Optional<Kanban> optionalKanban = kanbanService.getKanbanByTitle(title);
            if (optionalKanban.isPresent()) {
                return new ResponseEntity<>(optionalKanban.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No kanban found with a title" + title, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createKanban(@RequestBody KanbanDTO kanbanDTO) {
        try {
            return new ResponseEntity<>(kanbanService.saveKanban(kanbanDTO), HttpStatus.CREATED);
        } catch (Exception exception) {
            return errorResponse();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateKanban(@PathVariable Long id, @RequestBody KanbanDTO kanbanDTO) {
        try {
            Optional<Kanban> optionalKanban = this.kanbanService.getKanbanById(id);
            if (optionalKanban.isPresent()) {
                return new ResponseEntity<>(this.kanbanService.updateKanban(optionalKanban.get(), kanbanDTO), HttpStatus.OK);
            } else {
                return noKanbanFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKanban(@PathVariable Long id) {
        try {
            Optional<Kanban> optionalKanban = this.kanbanService.getKanbanById(id);
            if (optionalKanban.isPresent()) {
                this.kanbanService.deleteKanban(optionalKanban.get());
                return new ResponseEntity<>(String.format("Kanban with id: %d was deleted", id), HttpStatus.OK);
            } else {
                return noKanbanFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("/{kanbanId}/tasks/all")
    public ResponseEntity<?> getAllTasksInKanban(@PathVariable Long kanbanId) {
        try {
            Optional<Kanban> optionalKanban = this.kanbanService.getKanbanById(kanbanId);
            if (optionalKanban.isPresent()) {
                return new ResponseEntity<>(optionalKanban.get().getTasks(), HttpStatus.OK);
            } else {
                return noKanbanFoundResponse(kanbanId);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PostMapping("/{kanbanId}/tasks/")
    public ResponseEntity<?> createTaskAssignedToKanban(@PathVariable Long kanbanId, @RequestBody TaskDTO taskDTO) {
        try {
            return new ResponseEntity<>(kanbanService.addNewTaskToKanban(kanbanId, taskDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    private ResponseEntity<String> errorResponse() {
        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noKanbanFoundResponse(Long id) {
        return new ResponseEntity<>("No Kanban found with id: " + id, HttpStatus.NOT_FOUND);
    }
}
