package com.niit.bej.kanban.board.model;

import java.util.Objects;

public class TaskStatus {
    private int todo;
    private int inProgress;
    private int completed;

    public TaskStatus() {
    }

    public TaskStatus(int todo, int inProgress, int completed) {
        this.todo = todo;
        this.inProgress = inProgress;
        this.completed = completed;
    }

    public int getTodo() {
        return todo;
    }

    public void setTodo(int todo) {
        this.todo = todo;
    }

    public int getInProgress() {
        return inProgress;
    }

    public void setInProgress(int inProgress) {
        this.inProgress = inProgress;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskStatus that = (TaskStatus) o;
        return todo == that.todo && inProgress == that.inProgress && completed == that.completed;
    }

    @Override
    public int hashCode() {
        return Objects.hash(todo, inProgress, completed);
    }

    @Override
    public String toString() {
        return "TaskStatus{" +
                "todo=" + todo +
                ", inProgress=" + inProgress +
                ", completed=" + completed +
                '}';
    }
}
