package com.niit.bej.kanban.board.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;
@Document(collection = "tasks")
public class Tasks {
    private String title;
    private TaskStatus status;
    private List<Cards> cards;

    public Tasks() {
    }

    public Tasks(String title,TaskStatus status, List<Cards> cards) {
        this.title = title;
        this.status = status;
        this.cards = cards;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
        return Objects.equals(title, tasks.title) && Objects.equals(status, tasks.status) && Objects.equals(cards, tasks.cards);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, status, cards);
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "title='" + title + '\'' +
                ", status=" + status +
                ", cards=" + cards +
                '}';
    }
}
