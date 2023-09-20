package com.niit.bej.kanban.board.repository;

import org.springframework.data.mongodb.core.messaging.Task;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TaskRepository extends CrudRepository<Task,Long> {
    Optional<Task> findByTitle(String title);
}
