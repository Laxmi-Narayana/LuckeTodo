# LuckeTodo — API Contracts

Base path:

```text
/api
```

## Authentication

### 1. Sign Up

```http
POST /api/auth/signup
Content-Type: application/json
```

Request:

```json
{
  "firstName": "LaxmiNarayana",
  "lastName": "Gellu",
  "email": "laxmi@example.com",
  "password": "Password123!"
}
```

Response:

```http
201 Created
```

```json
{
  "id": "8c5f1c4e-8b9a-4a2e-9f72-123456789abc",
  "firstName": "LaxmiNarayana",
  "lastName": "Gellu",
  "email": "laxmi@example.com"
}
```

Never return the password or password hash.

### 2. Sign In

```http
POST /api/auth/signin
Content-Type: application/json
```

Request:

```json
{
  "email": "laxmi@example.com",
  "password": "Password123!"
}
```

Response:

```http
200 OK
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer"
}
```

### 3. Logout

```http
POST /api/auth/logout
Authorization: Bearer <JWT>
```

Response:

```http
204 No Content
```

For V1, logout removes the JWT from the client. Server-side token revocation/refresh-token rotation is future scope.

---

# Tasks

All task APIs require authentication.

```http
Authorization: Bearer <JWT>
```

## 4. Create Task

```http
POST /api/tasks
Content-Type: application/json
```

Request:

```json
{
  "title": "Learn Spring Boot",
  "description": "Build a REST API"
}
```

Response:

```http
201 Created
```

```json
{
  "id": "7a1e...",
  "title": "Learn Spring Boot",
  "description": "Build a REST API",
  "status": "TODO",
  "createdAt": "2026-09-08T12:30:00Z",
  "updatedAt": "2026-09-08T12:30:00Z"
}
```

The client does not provide `userId`. The backend determines the owner from the authenticated user.

## 5. Get My Tasks

```http
GET /api/tasks
```

Response:

```http
200 OK
```

```json
[
  {
    "id": "7a1e...",
    "title": "Learn Spring Boot",
    "description": "Build a REST API",
    "status": "TODO",
    "createdAt": "2026-09-08T12:30:00Z",
    "updatedAt": "2026-09-08T12:30:00Z"
  }
]
```

Only tasks belonging to the authenticated user are returned.

## 6. Get Single Task

```http
GET /api/tasks/{taskId}
```

Response:

```http
200 OK
```

```json
{
  "id": "7a1e...",
  "title": "Learn Spring Boot",
  "description": "Build a REST API",
  "status": "TODO",
  "createdAt": "2026-09-08T12:30:00Z",
  "updatedAt": "2026-09-08T12:30:00Z"
}
```

## 7. Update Task

```http
PUT /api/tasks/{taskId}
Content-Type: application/json
```

Request:

```json
{
  "title": "Learn Spring Boot properly",
  "description": "Build and deploy a REST API"
}
```

Response:

```http
200 OK
```

```json
{
  "id": "7a1e...",
  "title": "Learn Spring Boot properly",
  "description": "Build and deploy a REST API",
  "status": "TODO",
  "createdAt": "2026-09-08T12:30:00Z",
  "updatedAt": "2026-09-08T13:00:00Z"
}
```

## 8. Change Task Status

```http
PATCH /api/tasks/{taskId}/status
Content-Type: application/json
```

Request:

```json
{
  "status": "COMPLETED"
}
```

Response:

```http
200 OK
```

The response contains the updated task.

## 9. Delete Task

```http
DELETE /api/tasks/{taskId}
```

Response:

```http
204 No Content
```

## Common Error Responses

### Validation Error

```http
400 Bad Request
```

### Authentication Required

```http
401 Unauthorized
```

### Resource Not Found

```http
404 Not Found
```

### Access Denied

```http
403 Forbidden
```

For task operations, the implementation should preferably avoid exposing whether another user's task exists. The service/repository layer can query by both task ID and authenticated user ID.
