package com.niit.bej.kanban.board.model;

import java.util.Date;
import java.util.Objects;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColors() {
        return colors;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    public String getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members = members;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cards cards = (Cards) o;
        return Objects.equals(title, cards.title) && Objects.equals(description, cards.description) && Objects.equals(colors, cards.colors) && Objects.equals(members, cards.members) && Objects.equals(dueDate, cards.dueDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description, colors, members, dueDate);
    }

    @Override
    public String toString() {
        return "Cards{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", colors='" + colors + '\'' +
                ", members='" + members + '\'' +
                ", dueDate=" + dueDate +
                '}';
    }
}
