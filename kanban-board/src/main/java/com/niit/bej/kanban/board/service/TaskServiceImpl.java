package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.TaskDTO;
import com.niit.bej.kanban.board.repository.TaskRepository;
import org.springframework.data.mongodb.core.messaging.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public List<Task> getAllTasks() {
        return null;
    }

    @Override
    @Transactional
    public Optional<Task> getTaskById(Long id) {
        return Optional.empty();
    }

    @Override
    @Transactional
    public Optional<Task> getTaskByTitle(String title) {
        return Optional.empty();
    }

    @Override
    @Transactional
    public Task saveTask(TaskDTO taskDTO) {
        return null;
    }

    @Override
    @Transactional
    public Task updateTask(Task oldTask, TaskDTO newTaskDTO) {
        return null;
    }

    @Override
    @Transactional
    public void deleteTask(Task task) {

    }
}
