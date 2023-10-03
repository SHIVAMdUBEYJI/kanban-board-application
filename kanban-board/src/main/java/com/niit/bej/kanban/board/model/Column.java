package com.niit.bej.kanban.board.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Column {
    private String columnName;
    private List<Task> tasks;

    public Column() {
        this.tasks = new ArrayList<>();
    }
}

