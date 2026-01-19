import { Model, Optional } from 'sequelize';
import { Request, Response, NextFunction } from 'express';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'writer' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface TaskAttributes {
  id: number;
  title: string;
  genre: string;
  description: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: 'writer' | 'user';
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate?: (models: DbModels) => void;
  static validateEmail?: (email: string) => boolean;
  static validatePassword?: (password: string) => boolean;
  static validateSignInData?: (data: SignInData) => ValidationResult;
  static validateSignUpData?: (data: SignUpData) => ValidationResult;
}

export class TaskModel
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  declare id: number;
  declare title: string;
  declare genre: string;
  declare description: string;
  declare user_id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate?: (models: DbModels) => void;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T | null;
  error: unknown;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface ValidationResult {
  isValid: boolean;
  error: string | null;

export interface JwtPayload {
  user: Omit<UserAttributes, 'password'>;
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtConfig {
  access: {
    expiresIn: number;
  };
  refresh: {
    expiresIn: number;
  };
}

export interface CookieConfig {
  httpOnly: boolean;
  maxAge: number;
}

export type SequelizeDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

export interface DatabaseConfig {
  use_env_variable?: string;
  database?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
  dialect?: SequelizeDialect;
}

export interface DbModels {
  User: typeof UserModel;
  Task: typeof TaskModel;
  [key: string]: unknown;
}

export interface CustomLocals {
  user?: Omit<UserAttributes, 'password'>;
  task?: TaskModel;
}

export interface TypedResponse extends Response {
  locals: CustomLocals;
}

export type MiddlewareFunction = (
  req: Request,
  res: TypedResponse,
  next: NextFunction,
) => void | Promise<void>;

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role?: 'writer' | 'user';
}

export interface UpdateUserData {
  username?: string;
  email?: string;
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
