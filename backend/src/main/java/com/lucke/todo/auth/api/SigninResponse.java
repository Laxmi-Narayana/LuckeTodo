package com.lucke.todo.auth.api;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SigninResponse {

    private String accessToken;
    private String tokenType;
}