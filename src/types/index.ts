export type Nullable<T> = T | null;

export interface IRoadmap {
  name?: string;
  description?: string;
  tags: string[];
}

export interface ITag {
  text: string;
  tiClasses: string[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  password?: string;
}
