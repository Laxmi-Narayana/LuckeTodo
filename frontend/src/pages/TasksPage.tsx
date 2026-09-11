import { useEffect, useState } from 'react';
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
    updateTaskStatus,
} from '../api/taskApi';
import type {
    CreateTaskRequest,
    TaskResponse,
    TaskStatus,
} from '../types/task';
import AppLayout from '../components/AppLayout';

function TasksPage() {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creating, setCreating] = useState(false);

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [updating, setUpdating] = useState(false);

    async function handleDeleteTask(taskId: string) {
        setError('');
        setSuccess('');

        try {
            await deleteTask(taskId);

            setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== taskId),
            );

            setSuccess('Task deleted successfully');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete task',
            );
        }
    }

    async function handleStatusChange(
        taskId: string,
        status: TaskStatus,
    ) {
        setError('');
        setSuccess('');

        try {
            const updatedTask = await updateTaskStatus(taskId, { status });

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task,
                ),
            );

            setSuccess('Task status updated');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update task status',
            );
        }
    }

    async function handleUpdateTask(
        event: React.SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (!editingTaskId) {
            return;
        }

        setUpdating(true);
        setError('');
        setSuccess('');

        try {
            const updatedTask = await updateTask(editingTaskId, {
                title: editTitle,
                description: editDescription,
            });

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task,
                ),
            );

            setEditingTaskId(null);
            setSuccess('Task updated successfully');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to update task',
            );
        } finally {
            setUpdating(false);
        }
    }

    async function handleCreateTask(
        event: React.SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setCreating(true);
        setError('');
        setSuccess('');

        try {
            const request: CreateTaskRequest = {
                title,
                description,
            };

            const task = await createTask(request);

            setTasks((currentTasks) => [task, ...currentTasks]);

            setTitle('');
            setDescription('');
            setSuccess('Task created successfully');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to create task',
            );
        } finally {
            setCreating(false);
        }
    }

    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load tasks',
                );
            } finally {
                setLoading(false);
            }
        }

        loadTasks();
    }, []);

    if (loading) {
        return (
            <AppLayout>
                <div className="loading-state">
                    Loading tasks...
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="page-heading">
                <h2>My Tasks</h2>
                <p>Keep track of what needs to get done.</p>
            </div>

            {error && (
                <div className="form-error" role="alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="form-success" role="status">
                    {success}
                </div>
            )}

            <div className="task-create-card">
                <h3>Create a task</h3>

                <form
                    className="task-form"
                    onSubmit={handleCreateTask}
                >
                    <div className="form-field">
                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="What needs to be done?"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Add some details..."
                        />
                    </div>

                    <div className="task-form-actions">
                        <button
                            type="submit"
                            disabled={creating}
                        >
                            {creating
                                ? 'Creating...'
                                : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="tasks-section">
                <h3>Your tasks</h3>

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks yet.</p>
                        <span>
                            Create your first task above.
                        </span>
                    </div>
                ) : (
                    <ul className="tasks-list">
                        {tasks.map((task) => (
                            <li
                                className="task-card"
                                key={task.id}
                            >
                                {editingTaskId === task.id ? (
                                    <form
                                        className="task-edit-form"
                                        onSubmit={handleUpdateTask}
                                    >
                                        <div className="form-field">
                                            <label
                                                htmlFor={`edit-title-${task.id}`}
                                            >
                                                Title
                                            </label>

                                            <input
                                                id={`edit-title-${task.id}`}
                                                value={editTitle}
                                                onChange={(event) =>
                                                    setEditTitle(
                                                        event.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="form-field">
                                            <label
                                                htmlFor={`edit-description-${task.id}`}
                                            >
                                                Description
                                            </label>

                                            <textarea
                                                id={`edit-description-${task.id}`}
                                                value={editDescription}
                                                onChange={(event) =>
                                                    setEditDescription(
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="task-actions">
                                            <button
                                                type="submit"
                                                disabled={updating}
                                            >
                                                {updating
                                                    ? 'Saving...'
                                                    : 'Save'}
                                            </button>

                                            <button
                                                className="button-secondary"
                                                type="button"
                                                onClick={() =>
                                                    setEditingTaskId(null)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="task-card-content">
                                            <div>
                                                <h4>{task.title}</h4>

                                                {task.description && (
                                                    <p>
                                                        {task.description}
                                                    </p>
                                                )}
                                            </div>

                                            <span
                                                className={`status-badge status-${task.status.toLowerCase()}`}
                                            >
                                                {task.status === 'IN_PROGRESS'
                                                    ? 'In Progress'
                                                    : task.status === 'COMPLETED'
                                                        ? 'Completed'
                                                        : 'Todo'}
                                            </span>
                                        </div>

                                        <div className="task-card-footer">
                                            <div className="task-status">
                                                <label
                                                    htmlFor={`status-${task.id}`}
                                                >
                                                    Status
                                                </label>

                                                <select
                                                    id={`status-${task.id}`}
                                                    value={task.status}
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            task.id,
                                                            event.target
                                                                .value as TaskStatus,
                                                        )
                                                    }
                                                >
                                                    <option value="TODO">
                                                        Todo
                                                    </option>

                                                    <option value="IN_PROGRESS">
                                                        In Progress
                                                    </option>

                                                    <option value="COMPLETED">
                                                        Completed
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="task-actions">
                                                <button
                                                    className="button-secondary"
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingTaskId(task.id);
                                                        setEditTitle(task.title);
                                                        setEditDescription(
                                                            task.description ?? '',
                                                        );
                                                        setError('');
                                                        setSuccess('');
                                                    }}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="button-danger"
                                                    type="button"
                                                    onClick={() => {
                                                        const confirmed =
                                                            window.confirm(
                                                                `Delete "${task.title}"?`,
                                                            );

                                                        if (confirmed) {
                                                            handleDeleteTask(task.id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
}

export default TasksPage;