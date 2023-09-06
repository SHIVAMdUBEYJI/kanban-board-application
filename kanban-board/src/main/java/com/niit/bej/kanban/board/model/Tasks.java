package com.niit.bej.kanban.board.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Objects;
@Document(collection = "tasks")
public class Tasks {
    @MongoId
    private String taskTitle;
    private TaskStatus status;
    private List<Cards> cards;

    public Tasks() {
    }

    public Tasks(String taskTitle, TaskStatus status, List<Cards> cards) {
        this.taskTitle = taskTitle;
        this.status = status;
        this.cards = cards;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
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
        return Objects.equals(taskTitle, tasks.taskTitle) && Objects.equals(status, tasks.status) && Objects.equals(cards, tasks.cards);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskTitle, status, cards);
    }

    @Override
    public String toString() {
        return "Tasks{" +
                "taskTitle='" + taskTitle + '\'' +
                ", status=" + status +
                ", cards=" + cards +
                '}';
    }
}
