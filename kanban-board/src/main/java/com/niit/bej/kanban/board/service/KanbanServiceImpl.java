package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Board;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KanbanServiceImpl implements KanbanService {

    private final KanbanRepository kanbanRepository;

    private final MongoTemplate mongoTemplate;

    @Autowired
    public KanbanServiceImpl(KanbanRepository kanbanRepository, MongoTemplate mongoTemplate) {
        this.kanbanRepository = kanbanRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Kanban getKanbanByEmail(String email) {
        return this.kanbanRepository.findKanbanByEmail(email);
    }

    @Override
    public Kanban saveKanban(Kanban kanban) {
        return this.kanbanRepository.save(kanban);
    }

    @Override
    public Kanban updateKanban(Kanban kanban) {
        List<Board> kanbanBoards = kanban.getBoards();
        for (Board board : kanbanBoards) {
            if (!board.getMembers().isEmpty()) {
                List<String> boardMembers = board.getMembers();
                for (String members : boardMembers) {
                    Kanban kanbanByEmail = this.kanbanRepository.findKanbanByEmail(members);
                    if (kanbanByEmail != null) {
                        List<Board> kanbanByEmailBoards = kanbanByEmail.getBoards();
                        for (Board kanbanByEmailBoard : kanbanByEmailBoards) {
                            if (kanbanByEmailBoard.getBoardName().equals(board.getBoardName())) {
                                kanbanByEmailBoard.setBoardName(board.getBoardName());
                                kanbanByEmailBoard.setColumns(board.getColumns());
                                kanbanByEmailBoard.setMembers(board.getMembers());
                                this.kanbanRepository.save(kanbanByEmail);
                            }
                        }
                    }
                }
            }
        }
        return this.kanbanRepository.save(kanban);
    }

    @Override
    public void deleteKanbanByEmail(String email) {
        this.kanbanRepository.deleteById(email);
    }

    @Override
    public Kanban addMemberToBoardByEmail(Kanban kanban, String email) {
        Kanban kanbanByEmail = this.kanbanRepository.findKanbanByEmail(email);
        if (kanbanByEmail != null) {
            List<Board> boards = kanban.getBoards();
            for (Board board : boards) {
                if (board.getMembers().contains(email)) {
                    if (kanbanByEmail.getBoards().contains(board)) {
                        continue;
                    }
                    if (!board.getMembers().contains(kanban.getEmail())) {
                        board.getMembers().add(kanban.getEmail());
                    }
                    kanbanByEmail.getBoards().add(board);
                    this.kanbanRepository.save(kanban);
                    this.kanbanRepository.save(kanbanByEmail);
                    this.updateKanban(kanban);
                }
            }
        }
        return kanban;
    }

    @Override
    public List<String> getAllEmailsInBoard(String email, String boardName) {
        Query query = new Query(Criteria.where("email").is(email).and("boards.boardName").is(boardName));
        return mongoTemplate.find(query, Kanban.class).get(0).getBoards().get(0).getMembers();
    }
}
