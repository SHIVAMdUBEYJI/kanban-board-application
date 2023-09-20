package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.KanbanDTO;
import com.niit.bej.kanban.board.model.TaskDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class KanbanServiceImpl implements KanbanService {
    @Override
    @Transactional
    public List<Kanban> getAllKanbanBoards() {
        return null;
    }

    @Override
    @Transactional
    public Optional<Kanban> getKanbanById(Long id) {
        return Optional.empty();
    }

    @Override
    @Transactional
    public Optional<Kanban> getKanbanByTitle(String title) {
        return Optional.empty();
    }

    @Override
    @Transactional
    public Kanban saveKanban(KanbanDTO kanbanDTO) {
        return null;
    }

    @Override
    @Transactional
    public Kanban updateKanban(Kanban oldKanban, KanbanDTO newKanbanDTO) {
        return null;
    }

    @Override
    @Transactional
    public void deleteKanban(Kanban kanban) {

    }

    @Override
    @Transactionaladd
    public Kanban addNewTaskToKanban(Long kanbanId, TaskDTO taskDTO) {
        return null;
    }
}
