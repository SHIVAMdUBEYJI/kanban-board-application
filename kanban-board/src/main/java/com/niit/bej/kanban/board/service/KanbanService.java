package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.exception.KanbanAlreadyExistsException;
import com.niit.bej.kanban.board.exception.KanbanDoesNotExistsException;
import com.niit.bej.kanban.board.exception.TitleNotFoundException;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.Tasks;

import java.util.List;
import java.util.Optional;

public interface KanbanService {
    Optional<Kanban> getByTitle(String title) throws TitleNotFoundException;

    List<Kanban> getAllKanban() throws KanbanDoesNotExistsException;

    Kanban saveKanban(Kanban kanban) throws KanbanAlreadyExistsException;

    Kanban updateKanban(String title ,Kanban kanban ,Kanban updatedKanban) throws KanbanDoesNotExistsException;

    void deleteKanban() throws KanbanDoesNotExistsException;

    Kanban addNewTask(int kanbanId, Tasks tasks);

}
