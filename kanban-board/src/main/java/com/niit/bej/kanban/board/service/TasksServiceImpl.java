package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Tasks;
import com.niit.bej.kanban.board.repository.TasksRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TasksServiceImpl implements TasksService {

    private final TasksRepository tasksRepository;

    public TasksServiceImpl(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Override
    public Tasks saveTask(Tasks tasks) {
        return this.tasksRepository.save(tasks);
    }

    @Override
    public List<Tasks> getAllTasks() {
        List<Tasks> tasksList = this.tasksRepository.findAll();
        return tasksList;
    }

    @Override
    public Optional<Tasks> getTaskByTitle(String title) {
        Optional<Tasks> optionalTasks = this.tasksRepository.findByTitle(title);
        return optionalTasks;
    }

    @Override
    public Tasks updateTask(Tasks tasks) {
        return null;
    }

    @Override
    public void deleteTask(Tasks tasks) {

    }
}
