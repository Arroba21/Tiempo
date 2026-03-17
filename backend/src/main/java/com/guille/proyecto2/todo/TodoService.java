package com.guille.proyecto2.todo;

import com.guille.proyecto2.common.NotFoundException;
import com.guille.proyecto2.todo.dto.TodoCreateRequest;
import com.guille.proyecto2.todo.dto.TodoResponse;
import com.guille.proyecto2.todo.dto.TodoUpdateRequest;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoService {
    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public List<TodoResponse> list() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(TodoService::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public TodoResponse get(long id) {
        Todo todo = repo.findById(id).orElseThrow(() -> new NotFoundException("Todo not found: " + id));
        return toResponse(todo);
    }

    @Transactional
    public TodoResponse create(TodoCreateRequest req) {
        Todo todo = new Todo();
        todo.setTitle(req.title().trim());
        todo.setCompleted(false);
        return toResponse(repo.save(todo));
    }

    @Transactional
    public TodoResponse update(long id, TodoUpdateRequest req) {
        Todo todo = repo.findById(id).orElseThrow(() -> new NotFoundException("Todo not found: " + id));
        todo.setTitle(req.title().trim());
        todo.setCompleted(req.completed());
        return toResponse(repo.save(todo));
    }

    @Transactional
    public void delete(long id) {
        if (!repo.existsById(id)) {
            throw new NotFoundException("Todo not found: " + id);
        }
        repo.deleteById(id);
    }

    private static TodoResponse toResponse(Todo t) {
        return new TodoResponse(t.getId(), t.getTitle(), t.isCompleted(), t.getCreatedAt(), t.getUpdatedAt());
    }
}

