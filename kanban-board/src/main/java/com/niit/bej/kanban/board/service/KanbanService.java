package com.niit.bej.kanban.board.service;

import com.niit.bej.kanban.board.model.Kanban;

import java.util.List;

public interface KanbanService {

    Kanban getKanbanByEmail(String email);

    Kanban saveKanban(Kanban kanban);

    Kanban updateKanban(Kanban kanban);

    void deleteKanbanByEmail(String email);

    Kanban addMemberToBoardByEmail(Kanban kanban,String email);

   List<String>getAllEmailsInBoard(String email,String boardName);
}
