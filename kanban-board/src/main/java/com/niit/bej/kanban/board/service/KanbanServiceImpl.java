package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.KanbanDTO;
import com.niit.bej.kanban.board.model.TaskDTO;
import com.niit.bej.kanban.board.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class KanbanServiceImpl implements KanbanService {

    private final KanbanRepository kanbanRepository;

    @Autowired
    public KanbanServiceImpl(KanbanRepository kanbanRepository) {
        this.kanbanRepository = kanbanRepository;
    }

    @Override
    @Transactional
    public List<Kanban> getAllKanbanBoards() {
        List<Kanban> kanbanList = return null;
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
    @Transactional
    public Kanban addNewTaskToKanban(Long kanbanId, TaskDTO taskDTO) {
        return null;
    }
}
