package com.niit.bej.kanban.board.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
public class Board {
    private final List<Column> columns;
    private final List<String> members;
    private String boardName;

    public Board() {
        this.columns = new ArrayList<>();
        this.members = new ArrayList<>();
    }

    public void setColumns(List<Column> columns) {
    }

    public void setMembers(List<String> members) {
    }

}
