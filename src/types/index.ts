import { Elements } from "@braks/vue-flow";

export type Nullable<T> = T | null;

export interface IRoadmap {
  title?: string;
  description?: string;
  tags: string[];
  elements: Elements | string;
}

export interface ITag {
  text: string;
  tiClasses: string[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface IUserRegisterForm extends IUser {
  password: string;
}

export interface ISignInUser extends IUser {
  _id: string;
  token: string;
}

export interface IRoadmapWithUser extends IRoadmap {
  elements: string;
  userId: string;
}
