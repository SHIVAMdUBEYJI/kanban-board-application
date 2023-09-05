package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.exception.KanbanAlreadyExistsException;
import com.niit.bej.kanban.board.exception.KanbanDoesNotExistsException;
import com.niit.bej.kanban.board.exception.TitleNotFoundException;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.Tasks;
import com.niit.bej.kanban.board.repository.KanbanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KanbanServiceImpl implements KanbanService {

    private final KanbanRepository kanbanRepository;

    public KanbanServiceImpl(KanbanRepository kanbanRepository) {
        this.kanbanRepository = kanbanRepository;
    }

    @Override
    public Optional<Kanban> getByTitle(String title) throws TitleNotFoundException {
        Optional<Kanban> optionalKanban = this.kanbanRepository.findKanbanByTitle(title);
        if (optionalKanban.isEmpty()) {
            throw new TitleNotFoundException("Title not found");
        }
        return optionalKanban;
    }

    @Override
    public List<Kanban> getAllKanban() throws KanbanDoesNotExistsException {
        List<Kanban> kanbanList = this.kanbanRepository.findAll();
        if (kanbanList.isEmpty()) {
            throw new KanbanDoesNotExistsException("Kanban does not exist");
        }
        return kanbanList;
    }

    @Override
    public Kanban saveKanban(Kanban kanban) throws KanbanAlreadyExistsException {
        return this.kanbanRepository.save(kanban);
    }

    @Override
    public Kanban updateKanban(String title, Kanban kanban, Kanban updatedKanban) throws KanbanDoesNotExistsException {
        Kanban kanbanFromDatabase = getKanbanFromDatabase(title);
        List<Tasks> optionalTasks = kanbanFromDatabase.getTasks();
        if (optionalTasks.isEmpty()) {
            throw new KanbanDoesNotExistsException("Does not exist");
        }

    }


    public Kanban getKanbanFromDatabase(String title) throws KanbanDoesNotExistsException {
        Optional<Kanban> optionalKanban = this.kanbanRepository.findKanbanByTitle(title);
        if (optionalKanban.isEmpty()) {
            throw new KanbanDoesNotExistsException("not found");
        }
        return optionalKanban.get();
    }

    private Kanban findKanbanByTitle(List<Kanban> kanbanList, String title) throws KanbanDoesNotExistsException {
        Optional<Kanban> optionalKanban = kanbanList.stream().filter(kanban -> kanban.getTitle().trim().equals(title)).findFirst();
        return optionalKanban.orElseThrow(() -> new KanbanDoesNotExistsException("Could not find kanban" + title + "!"));
    }


    @Override
    public void deleteKanban() throws KanbanDoesNotExistsException {

    }

    @Override
    public Kanban addNewTask(int kanbanId, Tasks tasks) {
        return null;
    }
}
