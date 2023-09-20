package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.TaskDTO;
import org.springframework.data.mongodb.core.messaging.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class TaskServiceImpl implements TaskService {
    @Override
    public List<Task> getAllTasks() {
        return null;
    }

    @Override
    public Optional<Task> getTaskById(Long id) {
        return Optional.empty();
    }

    @Override
    public Optional<Task> getTaskByTitle(String title) {
        return Optional.empty();
    }

    @Override
    public Task saveTask(TaskDTO taskDTO) {
        return null;
    }

    @Override
    public Task updateTask(Task oldTask, TaskDTO newTaskDTO) {
        return null;
    }

    @Override
    public void deleteTask(Task task) {

    }
}
