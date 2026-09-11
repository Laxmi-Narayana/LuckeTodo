import apiRequest from './client';
import type {
    CreateTaskRequest,
    UpdateTaskRequest,
    UpdateTaskStatusRequest,
    TaskResponse,
} from '../types/task';

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export async function getTasks(): Promise<TaskResponse[]> {
    const response = await apiRequest<ApiResponse<TaskResponse[]>>(
        '/api/tasks',
    );

    return response.data;
}

export async function getTask(
    taskId: string,
): Promise<TaskResponse> {
    const response = await apiRequest<ApiResponse<TaskResponse>>(
        `/api/tasks/${taskId}`,
    );

    return response.data;
}

export async function createTask(
    request: CreateTaskRequest,
): Promise<TaskResponse> {
    const response = await apiRequest<ApiResponse<TaskResponse>>(
        '/api/tasks',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    );

    return response.data;
}

export async function updateTask(
    taskId: string,
    request: UpdateTaskRequest,
): Promise<TaskResponse> {
    const response = await apiRequest<ApiResponse<TaskResponse>>(
        `/api/tasks/${taskId}`,
        {
            method: 'PUT',
            body: JSON.stringify(request),
        },
    );

    return response.data;
}

export async function updateTaskStatus(
    taskId: string,
    request: UpdateTaskStatusRequest,
): Promise<TaskResponse> {
    const response = await apiRequest<ApiResponse<TaskResponse>>(
        `/api/tasks/${taskId}/status`,
        {
            method: 'PATCH',
            body: JSON.stringify(request),
        },
    );

    return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
    await apiRequest<void>(
        `/api/tasks/${taskId}`,
        {
            method: 'DELETE',
        },
    );
}