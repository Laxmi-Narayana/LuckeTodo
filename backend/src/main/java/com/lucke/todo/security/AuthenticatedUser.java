package com.lucke.todo.security;

import com.lucke.todo.user.security.UserPrincipal;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class AuthenticatedUser {

    public static UserPrincipal get() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            throw new IllegalStateException("No authenticated user found");
        }

        return (UserPrincipal) authentication.getPrincipal();
    }

    public static String getId() {
        return get().getId();
    }

    public static String getEmail() {
        return get().getUsername();
    }
}