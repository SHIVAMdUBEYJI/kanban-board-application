package com.niit.bej.kanban.board.repository;

import com.niit.bej.kanban.board.model.Task;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TaskRepository extends CrudRepository<Task,Long> {
    Optional<Task> findByTitle(String title);
}
