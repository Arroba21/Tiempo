# Backend (Spring Boot + MySQL)

## Requisitos
- Java 17
- Maven
- MySQL (local)

## 1) Crea la base de datos
```sql
CREATE DATABASE proyecto2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 2) Configura credenciales
Edita `src/main/resources/application.properties`:
- `spring.datasource.username`
- `spring.datasource.password`

## 3) Ejecuta
Desde la carpeta `backend/`:
```bash
mvn spring-boot:run
```

La API queda en `http://localhost:8080`.

## Endpoints (CRUD ejemplo)
- `GET /api/todos`
- `GET /api/todos/{id}`
- `POST /api/todos` body: `{ "title": "..." }`
- `PUT /api/todos/{id}` body: `{ "title": "...", "completed": true }`
- `DELETE /api/todos/{id}`

