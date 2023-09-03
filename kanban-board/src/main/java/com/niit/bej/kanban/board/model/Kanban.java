package com.niit.bej.kanban.board.model;

public class Kanban {
    private int id;
    private String title;
    private Tasks tasks;

    public Kanban() {
    }

    public Kanban(int id, String title, Tasks tasks) {
        this.id = id;
        this.title = title;
        this.tasks = tasks;
    }
}
