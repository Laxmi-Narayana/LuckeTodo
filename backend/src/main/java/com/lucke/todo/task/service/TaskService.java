package com.lucke.todo.task.service;

import com.lucke.todo.common.exception.ResourceNotFoundException;
import com.lucke.todo.security.AuthenticatedUser;
import com.lucke.todo.task.api.CreateTaskRequest;
import com.lucke.todo.task.api.TaskResponse;
import com.lucke.todo.task.api.UpdateTaskRequest;
import com.lucke.todo.task.api.UpdateTaskStatusRequest;
import com.lucke.todo.task.domain.Task;
import com.lucke.todo.task.domain.TaskStatus;
import com.lucke.todo.task.repository.TaskRepository;
import com.lucke.todo.user.domain.User;
import com.lucke.todo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskResponse createTask(CreateTaskRequest request) {

        String userId = AuthenticatedUser.getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Instant now = Instant.now();

        Task task = Task.builder()
                .id(UUID.randomUUID().toString())
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .status(TaskStatus.TODO)
                .createdAt(now)
                .updatedAt(now)
                .build();

        return toResponse(taskRepository.save(task));
    }

    public List<TaskResponse> getTasks() {

        String userId = AuthenticatedUser.getId();

        return taskRepository.findAllByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse getTask(String taskId) {

        String userId = AuthenticatedUser.getId();

        Task task = findTask(taskId, userId);

        return toResponse(task);
    }

    public TaskResponse updateTask(
            String taskId,
            UpdateTaskRequest request
    ) {

        String userId = AuthenticatedUser.getId();

        Task task = findTask(taskId, userId);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setUpdatedAt(Instant.now());

        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateTaskStatus(
            String taskId,
            UpdateTaskStatusRequest request
    ) {

        String userId = AuthenticatedUser.getId();

        Task task = findTask(taskId, userId);

        task.setStatus(request.getStatus());
        task.setUpdatedAt(Instant.now());

        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(String taskId) {

        String userId = AuthenticatedUser.getId();

        Task task = findTask(taskId, userId);

        taskRepository.delete(task);
    }

    private Task findTask(String taskId, String userId) {

        return taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));
    }

    private TaskResponse toResponse(Task task) {

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}