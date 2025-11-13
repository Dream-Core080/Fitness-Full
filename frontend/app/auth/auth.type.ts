export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ResetPasswodPayload {
  resetToken: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface UpdateUserPayload {
  firstname: string;
  lastname: string;
  note: string;
  experience: string;
  password?: string;
  repeatPassword?: string;
  avatar?: File;
}

export interface QuizPayload {
  experience: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  experience: string;
  note: string;
  avatarUrl: string;
  favorites: Array<any>;
  histories: Array<any>;
}
