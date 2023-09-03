package com.niit.bej.kanban.board.repository;

import com.niit.bej.kanban.board.model.Kanban;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface KanbanRepository extends MongoRepository<Kanban,Integer> {
    Optional<Kanban> findKanbanByTitle(String title);
}
