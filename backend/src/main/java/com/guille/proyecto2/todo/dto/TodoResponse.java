package com.guille.proyecto2.todo.dto;

import java.time.Instant;

public record TodoResponse(
        Long id,
        String title,
        boolean completed,
        Instant createdAt,
        Instant updatedAt
) {
}

