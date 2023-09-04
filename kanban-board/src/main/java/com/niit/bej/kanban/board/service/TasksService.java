package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Tasks;

import java.util.List;
import java.util.Optional;

public interface TasksService {
    Tasks saveTask(Tasks tasks);

    List<Tasks> getAllTasks();

    Optional<Tasks> getTaskByTitle(String title);

    Tasks updateTask(Tasks tasks);

    void deleteTask(Tasks tasks);
}
