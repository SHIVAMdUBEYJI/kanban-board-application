package com.niit.bej.kanban.board.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class Column {
    private String columnName;
    private List<Task> tasks;

}



