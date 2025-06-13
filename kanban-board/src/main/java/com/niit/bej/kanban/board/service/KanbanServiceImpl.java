package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Board;
import com.niit.bej.kanban.board.model.Kanban;
import com.niit.bej.kanban.board.repository.KanbanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KanbanServiceImpl implements KanbanService {

    private final KanbanRepository kanbanRepository;

    private final MongoTemplate mongoTemplate;

//    @Autowired
//    public KanbanServiceImpl(KanbanRepository kanbanRepository, MongoTemplate mongoTemplate) {
//        this.kanbanRepository = kanbanRepository;
//        this.mongoTemplate = mongoTemplate;
//    }

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
                String boardName = board.getBoardName();
                List<String> boardMembers = board.getMembers();

                for (String member : boardMembers) {
                    Kanban kanbanByEmail = this.kanbanRepository.findKanbanByEmail(member);

                    if (kanbanByEmail != null) {
                        List<Board> kanbanByEmailBoards = kanbanByEmail.getBoards();

                        for (Board kanbanByEmailBoard : kanbanByEmailBoards) {
                            if (kanbanByEmailBoard.getBoardName().equals(boardName)) {
                                kanbanByEmailBoard.setBoardName(boardName);
                                kanbanByEmailBoard.setColumns(board.getColumns());
                                kanbanByEmailBoard.setMembers(boardMembers);
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
            List<Board> kanbanBoards = kanban.getBoards();
            List<Board> kanbanByEmailBoards = kanbanByEmail.getBoards();

            for (Board board : kanbanBoards) {
                if (board.getMembers().contains(email) && !kanbanByEmailBoards.contains(board)) {
                    board.getMembers().add(email);
                    kanbanByEmailBoards.add(board);
                }
            }
            this.kanbanRepository.save(kanban);
            this.kanbanRepository.save(kanbanByEmail);
            this.updateKanban(kanban);
        }
        return kanban;
    }

    @Override
    public List<String> getAllEmailsInBoard(String email, String boardName) {
        Query query = new Query(Criteria.where("email").is(email).and("boards.boardName").is(boardName));

        Kanban kanban = mongoTemplate.findOne(query, Kanban.class);

        if (kanban != null && !kanban.getBoards().isEmpty()) {
            for (Board board : kanban.getBoards()) {
                if (board.getBoardName().equals(boardName)) {
                    return board.getMembers();
                }
            }
        }
        return Collections.emptyList();
    }
}
