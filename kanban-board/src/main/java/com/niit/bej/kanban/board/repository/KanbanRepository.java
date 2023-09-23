package com.niit.bej.kanban.board.repository;

import com.niit.bej.kanban.board.model.Kanban;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface KanbanRepository extends JpaRepository<Kanban ,Long> {

    Optional<Kanban> findByTitle(String title);
}
