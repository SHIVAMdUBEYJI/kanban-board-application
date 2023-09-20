package com.niit.bej.kanban.board.model;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@NoArgsConstructor
@Document
public class Task {
    @MongoId
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @ApiModelProperty(position = 1)
    private Long id;

    @ApiModelProperty(position = 2)
    private String title;

    @ApiModelProperty(position = 3)
    private String description;

    @ApiModelProperty(position = 4)
    private String color;

    @Enumerated(EnumType.STRING)
    @ApiModelProperty(position = 5)
    private TaskStatus status;

}
