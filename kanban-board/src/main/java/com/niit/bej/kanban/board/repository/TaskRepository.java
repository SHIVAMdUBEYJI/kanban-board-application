package com.niit.bej.kanban.board.repository;

import org.springframework.data.mongodb.core.messaging.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TaskRepository extends MongoRepository<Task,Long> {
    Optional<Task> findTaskByTitle(String title);
}
