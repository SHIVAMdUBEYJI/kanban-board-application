package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.KanbanDTO;
import com.niit.bej.kanban.board.model.Task;
import com.niit.bej.kanban.board.model.TaskDTO;
import com.niit.bej.kanban.board.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Component
public class KanbanServiceImpl implements KanbanService {

    private final KanbanRepository kanbanRepository;

    @Autowired
    public KanbanServiceImpl(KanbanRepository kanbanRepository) {
        this.kanbanRepository = kanbanRepository;
    }

    @Override
    @Transactional
    public List<Kanban> getAllKanbanBoards() {
        List<Kanban> kanbanList = new ArrayList<>();
        kanbanRepository.findAll().forEach(kanbanList::add);
        return kanbanList;

    }

    @Override
    @Transactional
    public Optional<Kanban> getKanbanById(Long id) {
        return this.kanbanRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Kanban> getKanbanByTitle(String title) {
        return this.kanbanRepository.findByTitle(title);
    }

    @Override
    @Transactional
    public Kanban saveKanban(KanbanDTO kanbanDTO) {
        return this.kanbanRepository.save(convertDTOToKanban(kanbanDTO));
    }

    @Override
    @Transactional
    public Kanban updateKanban(Kanban oldKanban, KanbanDTO newKanbanDTO) {
        oldKanban.setTitle(newKanbanDTO.getTitle());
        return this.kanbanRepository.save(oldKanban);
    }

    @Override
    @Transactional
    public void deleteKanban(Kanban kanban) {
        this.kanbanRepository.delete(kanban);
    }

    @Override
    @Transactional
    public Kanban addNewTaskToKanban(Long kanbanId, TaskDTO taskDTO) {
        Kanban kanban = this.kanbanRepository.findById(kanbanId).get();
        kanban.addTask(convertDTOToTask(taskDTO));
        return this.kanbanRepository.save(kanban);
    }

    private Kanban convertDTOToKanban(KanbanDTO kanbanDTO) {
        Kanban kanban = new Kanban();
        kanban.setTitle(kanbanDTO.getTitle());
        return kanban;
    }

    private Task convertDTOToTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setColor(taskDTO.getColor());
        task.setStatus(taskDTO.getStatus());
        return task;
    }
}
