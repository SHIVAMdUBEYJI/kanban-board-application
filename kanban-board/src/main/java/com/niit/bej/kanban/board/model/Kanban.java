package com.niit.bej.kanban.board.model;

import java.util.Objects;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Tasks getTasks() {
        return tasks;
    }

    public void setTasks(Tasks tasks) {
        this.tasks = tasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Kanban kanban = (Kanban) o;
        return id == kanban.id && Objects.equals(title, kanban.title) && Objects.equals(tasks, kanban.tasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, tasks);
    }

    @Override
    public String toString() {
        return "Kanban{" + "id=" + id + ", title='" + title + '\'' + ", tasks=" + tasks + '}';
    }
}
