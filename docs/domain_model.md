# LuckeTodo — Domain Model

## 1. User

Represents a registered LuckeTodo user.

### Attributes

| Attribute | Type | Description |
|---|---|---|
| id | UUID | Unique user identifier |
| email | String | Unique login email |
| passwordHash | String | Securely hashed password |
| firstName | String | User's first name |
| lastName | String | User's last name |
| role | UserRole | Application role |
| createdAt | Instant | Creation timestamp |
| updatedAt | Instant | Last update timestamp |

## 2. Task

Represents a task owned by a user.

### Attributes

| Attribute | Type | Description |
|---|---|---|
| id | UUID | Unique task identifier |
| user | User | Owner of the task |
| title | String | Task title |
| description | String | Optional task description |
| status | TaskStatus | Current task status |
| createdAt | Instant | Creation timestamp |
| updatedAt | Instant | Last update timestamp |

## 3. Relationship

```text
User 1 ─────────── * Task