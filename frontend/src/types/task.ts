export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface CreateTaskRequest {
    title: string;
    description?: string;
}

export interface UpdateTaskRequest {
    title: string;
    description?: string;
}

export interface UpdateTaskStatusRequest {
    status: TaskStatus;
}

export interface TaskResponse {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
}