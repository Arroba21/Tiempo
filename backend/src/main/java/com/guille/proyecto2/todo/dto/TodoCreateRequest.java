package com.guille.proyecto2.todo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TodoCreateRequest(
        @NotBlank @Size(max = 120) String title
) {
}

