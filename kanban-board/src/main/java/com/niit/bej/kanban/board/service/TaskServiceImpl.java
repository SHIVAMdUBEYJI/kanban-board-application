package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Task;
import com.niit.bej.kanban.board.model.TaskDTO;
import com.niit.bej.kanban.board.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public List<Task> getAllTasks() {
        List<Task> taskList = new ArrayList<>();
        this.taskRepository.findAll().forEach(taskList::add);
        return taskList;
    }

    @Override
    @Transactional
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Task> getTaskByTitle(String title) {
        return this.taskRepository.findByTitle(title);
    }

    @Override
    @Transactional
    public Task saveTask(TaskDTO taskDTO) {
        return this.taskRepository.save(convertDTOToTask(taskDTO));
    }

    @Override
    @Transactional
    public Task updateTask(Task oldTask, TaskDTO newTaskDTO) {
        return this.taskRepository.save(updateTaskFromDTO(oldTask, newTaskDTO));
    }

    @Override
    @Transactional
    public void deleteTask(Task task) {
        this.taskRepository.delete(task);
    }

    private Task convertDTOToTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setColor(taskDTO.getColor());
        task.setColor(taskDTO.getColor());
        return task;
    }

    private Task updateTaskFromDTO(Task task, TaskDTO taskDTO) {
        if (Optional.ofNullable(taskDTO.getTitle()).isPresent()) {
            task.setTitle(taskDTO.getTitle());
        }
        if (Optional.ofNullable((taskDTO.getDescription())).isPresent()) {
            task.setDescription(taskDTO.getDescription());
        }
        if (Optional.ofNullable((taskDTO.getColor())).isPresent()) {
            task.setColor(taskDTO.getColor());
        }
        if (Optional.ofNullable((taskDTO.getStatus())).isPresent()) {
            task.setStatus(taskDTO.getStatus());
        }
        return task;
    }
}
