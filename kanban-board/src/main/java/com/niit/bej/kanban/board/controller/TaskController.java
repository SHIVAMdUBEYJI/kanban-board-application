package com.niit.bej.kanban.board.controller;

import com.niit.bej.kanban.board.model.Task;
import com.niit.bej.kanban.board.model.TaskDTO;
import com.niit.bej.kanban.board.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllTasks() {
        try {
            return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id) {
        try {
            Optional<Task> optionalTask = this.taskService.getTaskById(id);
            if (optionalTask.isPresent()) {
                return new ResponseEntity<>(optionalTask.get(), HttpStatus.OK);
            } else {
                return noTaskFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getTaskByTitle(@RequestParam String title) {
        try {
            Optional<Task> optionalTask = this.taskService.getTaskByTitle(title);
            if (optionalTask.isPresent()) {
                return new ResponseEntity<>(optionalTask.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No Task found with a title: " + title, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createTask(@RequestBody TaskDTO taskDTO) {
        try {
            return new ResponseEntity<>(taskService.saveTask(taskDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        try {
            Optional<Task> optionalTask = this.taskService.getTaskById(id);
            if (optionalTask.isPresent()) {
                return new ResponseEntity<>(taskService.updateTask(optionalTask.get(), taskDTO), HttpStatus.OK);
            } else {
                return noTaskFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            Optional<Task> optionalTask = this.taskService.getTaskById(id);
            if (optionalTask.isPresent()) {
                this.taskService.deleteTask(optionalTask.get());
                return new ResponseEntity<>(String.format("Task with id: %d was deleted", id), HttpStatus.OK);
            } else {
                return noTaskFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    private ResponseEntity<String> errorResponse() {
        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noTaskFoundResponse(Long id) {
        return new ResponseEntity<>("No task found with id: " + id, HttpStatus.NOT_FOUND);
    }
}
