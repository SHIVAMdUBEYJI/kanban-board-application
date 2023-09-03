package com.niit.bej.kanban.board.model;

public class Tasks {
    private TaskStatus status;
    private Cards cards;

    public Tasks() {
    }

    public Tasks(TaskStatus status, Cards cards) {
        this.status = status;
        this.cards = cards;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Cards getCards() {
        return cards;
    }

    public void setCards(Cards cards) {
        this.cards = cards;
    }
}
