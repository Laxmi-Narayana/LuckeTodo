package com.lucke.todo.task.api;

import com.lucke.todo.common.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lucke.todo.task.service.TaskService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(
            @Valid @RequestBody CreateTaskRequest request
    ) {
        TaskResponse response = taskService.createTask(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Task created successfully",
                        response
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getTasks() {

        List<TaskResponse> response = taskService.getTasks();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Tasks retrieved successfully",
                        response
                )
        );
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<ApiResponse<TaskResponse>> getTask(
            @PathVariable String taskId
    ) {
        TaskResponse response = taskService.getTask(taskId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Task retrieved successfully",
                        response
                )
        );
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTask(
            @PathVariable String taskId,
            @Valid @RequestBody UpdateTaskRequest request
    ) {
        TaskResponse response = taskService.updateTask(
                taskId,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Task updated successfully",
                        response
                )
        );
    }

    @PatchMapping("/{taskId}/status")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTaskStatus(
            @PathVariable String taskId,
            @Valid @RequestBody UpdateTaskStatusRequest request
    ) {
        TaskResponse response = taskService.updateTaskStatus(
                taskId,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Task status updated successfully",
                        response
                )
        );
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable String taskId
    ) {
        taskService.deleteTask(taskId);

        return ResponseEntity.noContent().build();
    }
}