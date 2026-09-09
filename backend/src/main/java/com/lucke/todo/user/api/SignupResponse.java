package com.lucke.todo.user.api;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignupResponse {

    private String firstName;
    private String lastName;
    private String email;
}