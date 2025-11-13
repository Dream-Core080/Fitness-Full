export enum AuthPathnames {
  FORGOT_PASSWORD = "/auth/forgot-password",
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
}

export enum PrivatePathnames {
  QUIZ = "/auth/quiz",
  DASHBOARD = "/app/dashboard",
  LIBRARY = "/app/library",
  EXERCISE_DETAIL = "/app/library/:id",
  FAVORITES = "/app/favorites",
  HISTORY = "/app/history",
  RECOMMENDED = "/app/recommended",
  PROFILE = "/app/account/profile",
  BILLING = "https://ericcressey.com/login",
}

export const Pathnames = {
  ...AuthPathnames,
  ...PrivatePathnames,
};
