package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.KanbanDTO;
import com.niit.bej.kanban.board.model.TaskDTO;

import java.util.List;
import java.util.Optional;

public class KanbanServiceImpl implements KanbanService {
    @Override
    public List<Kanban> getAllKanbanBoards() {
        return null;
    }

    @Override
    public Optional<Kanban> getKanbanById(Long id) {
        return Optional.empty();
    }

    @Override
    public Optional<Kanban> getKanbanByTitle(String title) {
        return Optional.empty();
    }

    @Override
    public Kanban saveKanban(KanbanDTO kanbanDTO) {
        return null;
    }

    @Override
    public Kanban updateKanban(Kanban oldKanban, KanbanDTO newKanbanDTO) {
        return null;
    }

    @Override
    public void deleteKanban(Kanban kanban) {

    }

    @Override
    public Kanban addNewTaskToKanban(Long kanbanId, TaskDTO taskDTO) {
        return null;
    }
}
