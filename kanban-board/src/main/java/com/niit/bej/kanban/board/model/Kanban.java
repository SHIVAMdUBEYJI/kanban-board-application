package com.niit.bej.kanban.board.model;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.messaging.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
@Getter
@Setter
public class Kanban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(position = 1)
    private Long id;

    @ApiModelProperty(position = 2)
    private String title;

    @OneToMany(
            cascade = {CascadeType.ALL},
            fetch = FetchType.EAGER)
    @JoinColumn(name = "kanban_id")
    @ApiModelProperty(position = 3)
    private List<Task> tasks;

    public void addTask(Task task) {

        if (Objects.isNull(tasks)) {
            tasks = new ArrayList<>();
        }
        tasks.add(task);
    }
}
