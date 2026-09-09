package com.lucke.todo.common.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class ApiError {

    private Instant timestamp;
    private int status;
    private String code;
    private String message;
}