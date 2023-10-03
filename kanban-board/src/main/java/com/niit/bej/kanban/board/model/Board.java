package com.niit.bej.kanban.board.model;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Board {
    private final List<Column> columns;
    private final List<String> members;
    private String boardName;

    public Board() {
        this.columns = new ArrayList<>();
        this.members = new ArrayList<>();
    }
}
