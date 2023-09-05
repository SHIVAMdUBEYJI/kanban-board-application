package com.niit.bej.kanban.board.controller;

import com.niit.bej.kanban.board.model.Tasks;
import com.niit.bej.kanban.board.service.TasksService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class TaskController {
    private final TasksService tasksService;

    public TaskController(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody Tasks tasks) {
        try {
            Tasks createdTasks = this.tasksService.saveTask(tasks);
            return new ResponseEntity<>(createdTasks, HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTasks() {
        try {
            List<Tasks> tasksList = this.tasksService.getAllTasks();
            return new ResponseEntity<>(tasksList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/find/{title}")
    public ResponseEntity<?> getTaskByTitle(@PathVariable String title) {
        try {
            Optional<Tasks> optionalTasks = tasksService.getTaskByTitle(title);
            if (optionalTasks.isPresent()) {
                return new ResponseEntity<>(optionalTasks.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No Tasks Found with this Title :" + title, HttpStatus.NOT_FOUND);
            }
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
