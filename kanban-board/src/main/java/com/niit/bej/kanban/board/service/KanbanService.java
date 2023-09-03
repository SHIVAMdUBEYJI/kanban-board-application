package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Kanban;

import java.util.Optional;

public interface KanbanService {
    Optional<Kanban> getByTitle(String title);

}
