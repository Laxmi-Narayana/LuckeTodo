package com.lucke.todo.auth.api;

import com.lucke.todo.common.api.ApiResponse;
import com.lucke.todo.user.api.SignupRequest;
import com.lucke.todo.user.api.SignupResponse;
import com.lucke.todo.user.security.UserPrincipal;
import com.lucke.todo.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponse>> signup(
            @Valid @RequestBody SignupRequest request
    ) {
        SignupResponse response = userService.signup(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "User registered successfully",
                        response
                ));
    }

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<SigninResponse>> signin(
            @Valid @RequestBody SigninRequest request
    ) {
        SigninResponse response = userService.signin(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Signin successful",
                        response
                )
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<String>> me(
            @AuthenticationPrincipal UserPrincipal principal
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Authenticated user",
                        principal.getUsername()
                )
        );
    }

    @GetMapping("/admin-test")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> adminTest() {
        return ResponseEntity.ok(
                ApiResponse.success("Admin access granted")
        );
    }
}