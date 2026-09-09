package com.lucke.todo.task.repository;

import com.lucke.todo.task.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, String> {

    List<Task> findAllByUserId(String userId);

    Optional<Task> findByIdAndUserId(String taskId, String userId);
}