package com.lucke.todo.task.api;

import com.lucke.todo.task.domain.TaskStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class TaskResponse {

    private String id;
    private String title;
    private String description;
    private TaskStatus status;
    private Instant createdAt;
    private Instant updatedAt;
}