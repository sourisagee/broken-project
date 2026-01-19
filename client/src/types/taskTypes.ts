import type { UserAttributes } from './authTypes';

export interface TaskAttributes {
  id: number;
  title: string;
  genre: string;
  description: string;
  user_id: number;
  User: UserAttributes;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskData {
  title: string;
  genre: string;
  description: string;
  user_id: number;
}

export interface UpdateTaskData {
  title?: string;
  genre?: string;
  description?: string;
}

export interface DeleteTaskResponse {
  deletedCount: number;
}

export interface TaskResponse {
  task: TaskAttributes;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
  error: unknown;
}
