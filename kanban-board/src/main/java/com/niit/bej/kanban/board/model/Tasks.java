package com.niit.bej.kanban.board.model;

import java.util.List;
import java.util.Objects;

public class Tasks {
    private TaskStatus status;
    private List<Cards> cards;

    public Tasks() {
    }

    public Tasks(TaskStatus status, List<Cards> cards) {
        this.status = status;
        this.cards = cards;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public List<Cards> getCards() {
        return cards;
    }

    public void setCards(List<Cards> cards) {
        this.cards = cards;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tasks tasks = (Tasks) o;
        return Objects.equals(status, tasks.status) && Objects.equals(cards, tasks.cards);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, cards);
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "status=" + status +
                ", cards=" + cards +
                '}';
    }
}
