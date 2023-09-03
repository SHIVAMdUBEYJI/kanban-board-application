package com.niit.bej.kanban.board.model;

import java.util.Date;

public class Cards {
    private String title;
    private String description;
    private String colors;
    private String members;
    private Date dueDate;

    public Cards() {
    }

    public Cards(String title, String description, String colors, String members, Date dueDate) {
        this.title = title;
        this.description = description;
        this.colors = colors;
        this.members = members;
        this.dueDate = dueDate;
    }
}
