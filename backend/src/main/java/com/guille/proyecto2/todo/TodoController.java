package com.guille.proyecto2.todo;

import com.guille.proyecto2.todo.dto.TodoCreateRequest;
import com.guille.proyecto2.todo.dto.TodoResponse;
import com.guille.proyecto2.todo.dto.TodoUpdateRequest;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public List<TodoResponse> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public TodoResponse get(@PathVariable long id) {
        return service.get(id);
    }

    @PostMapping
    public ResponseEntity<TodoResponse> create(@Valid @RequestBody TodoCreateRequest req) {
        TodoResponse created = service.create(req);
        return ResponseEntity.created(URI.create("/api/todos/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public TodoResponse update(@PathVariable long id, @Valid @RequestBody TodoUpdateRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

