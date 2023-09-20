package com.niit.bej.kanban.board.repository;

import com.niit.bej.kanban.board.model.Kanban;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface KanbanRepository extends MongoRepository<Kanban ,Long> {
    Optional<Kanban> findKanbanByTitle(String title);
}
