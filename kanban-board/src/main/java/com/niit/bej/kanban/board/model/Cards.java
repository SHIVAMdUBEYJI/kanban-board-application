package com.niit.bej.kanban.board.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Objects;

public class Cards {
    private String title;
    private String description;
    private String colors;
    private String members;

    public Cards() {
    }

    public Cards(String title, String description, String colors, String members) {
        this.title = title;
        this.description = description;
        this.colors = colors;
        this.members = members;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cards cards = (Cards) o;
        return Objects.equals(title, cards.title) && Objects.equals(description, cards.description) && Objects.equals(colors, cards.colors) && Objects.equals(members, cards.members);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description, colors, members);
    }

    @Override
    public String toString() {
        return "Cards{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", colors='" + colors + '\'' +
                ", members='" + members + '\'' +
                '}';
    }
}
