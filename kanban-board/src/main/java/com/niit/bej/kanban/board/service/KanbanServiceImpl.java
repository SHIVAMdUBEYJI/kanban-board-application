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
    public Kanban updateKanban(int id, String taskTitle, Kanban updatedKanban) throws KanbanDoesNotExistsException {
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

    //  @Override
   // public Kanban updateKanban(int id, String taskTitle, TaskStatus taskStatus, List<Cards> cardsList, Kanban updatedKanban) throws KanbanDoesNotExistsException {
//        Optional<Kanban> kanbanFromDatabase = kanbanRepository.findById(id);
//        List<Tasks> tasksList = kanbanFromDatabase.get().getTasks();
//        if(tasksList.isEmpty()){
//            throw new KanbanDoesNotExistsException("Empty");
//        }
//        Tasks kanbanToUpdate = findKanbanById(tasksList,taskTitle);
//        kanbanToUpdate.setTaskTitle(updatedKanban.getTitle());
//
//        TaskStatus taskStatusUpdate = findById(taskStatus,taskTitle);
//        taskStatusUpdate.setTodo(taskStatusUpdate.getTodo());
//        taskStatusUpdate.setInProgress(taskStatusUpdate.getInProgress());
//        taskStatusUpdate.setCompleted(taskStatusUpdate.getCompleted());
//
//        Cards updateCards = findByCardTitle(cardsList,taskTitle);
//        updateCards.setTitle(updatedKanban.getTitle());
//        updateCards.setDescription(updateCards.getDescription());
//        updateCards.setColors(updateCards.getColors());
//        updateCards.setMembers(updateCards.getMembers());
//    }


//    public Kanban getKanbanFromDatabase(String title) throws KanbanDoesNotExistsException {
//        Optional<Kanban> optionalKanban = this.kanbanRepository.findKanbanByTitle(title);
//        if (optionalKanban.isEmpty()) {
//            throw new KanbanDoesNotExistsException("not found");
//        }
//        return optionalKanban.get();
//    }

//    private Tasks findKanbanById(List<Tasks> kanbanList, String title) throws KanbanDoesNotExistsException {
//        Optional<Tasks> optionalKanban = kanbanList.stream().filter(kanban -> kanban.getTaskTitle().trim().equals(title)).findFirst();
//        return optionalKanban.orElseThrow(() -> new KanbanDoesNotExistsException("Could not find kanban" + title + "!"));
//    }
//    private TaskStatus findById(TaskStatus taskStatus ,String title) throws KanbanDoesNotExistsException{
//       return null;
//    }
//    private Cards findByCardTitle(List<Cards> cardsList, String title) throws KanbanDoesNotExistsException {
//        Optional<Cards> optionalCards = cardsList.stream().filter(cards -> cards.getTitle().trim().equals(title)).findFirst();
//        return optionalCards.orElseThrow(()-> new KanbanDoesNotExistsException("not" + title));
//    }
//
//    @Override
//    public void deleteKanban() throws KanbanDoesNotExistsException {
//
//    }
//
//    @Override
//    public Kanban addNewTask(int kanbanId, Tasks tasks) {
//        return null;
//    }
//}

