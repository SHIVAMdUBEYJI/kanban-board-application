package com.niit.bej.kanban.board.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    private String name;
    private String description;
    private String priority;
    private LocalDate startDate;
    private LocalDate dueDate;
    private String assigneeEmail;
}
