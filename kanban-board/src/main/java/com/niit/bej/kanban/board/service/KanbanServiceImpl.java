package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.exception.KanbanAlreadyExistsException;
import com.niit.bej.kanban.board.exception.KanbanDoesNotExistsException;
import com.niit.bej.kanban.board.exception.TitleNotFoundException;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.model.Tasks;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class KanbanServiceImpl implements KanbanService {
    @Override
    public Optional<Kanban> getByTitle(String title) throws TitleNotFoundException {
        return Optional.empty();
    }

    @Override
    public List<Kanban> getAllKanban() throws KanbanDoesNotExistsException {
        return null;
    }

    @Override
    public Kanban saveKanban(Kanban kanban) throws KanbanAlreadyExistsException {
        return null;
    }

    @Override
    public Kanban updateKanban(Kanban kanban) throws KanbanDoesNotExistsException {
        return null;
    }

    @Override
    public void deleteKanban() throws KanbanDoesNotExistsException {

    }

    @Override
    public Kanban addNewTask(int kanbanId, Tasks tasks) {
        return null;
    }
}
