package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.TaskDTO;
import org.springframework.data.mongodb.core.messaging.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> getAllTasks();

    Optional<Task> getTaskById(Long id);

    Optional<Task> getTaskByTitle(String title);

    Task saveTask(TaskDTO taskDTO);

    Task updateTask(Task oldTask, TaskDTO newTaskDTO);

    void deleteTask(Task task);
}
