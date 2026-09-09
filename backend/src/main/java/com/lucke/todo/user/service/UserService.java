package com.lucke.todo.user.service;

import com.lucke.todo.auth.api.SigninRequest;
import com.lucke.todo.auth.api.SigninResponse;
import com.lucke.todo.common.exception.DuplicateResourceException;
import com.lucke.todo.common.exception.InvalidCredentialsException;
import com.lucke.todo.security.jwt.JwtService;
import com.lucke.todo.user.api.SignupRequest;
import com.lucke.todo.user.api.SignupResponse;
import com.lucke.todo.user.domain.User;
import com.lucke.todo.user.domain.UserRole;
import com.lucke.todo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public SignupResponse signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new DuplicateResourceException("Email already registered");
        }

        Instant now = Instant.now();

        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .email(request.getEmail().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(UserRole.USER)
                .createdAt(now)
                .updatedAt(now)
                .build();

        User savedUser = userRepository.save(user);

        return SignupResponse.builder()
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .build();
    }

    public SigninResponse signin(SigninRequest request) {

        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return SigninResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .build();
    }
}