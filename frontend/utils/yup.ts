import * as Yup from "yup";
import { isEmpty } from "./helpers/utility";

// Set default locale
Yup.setLocale({
  mixed: {
    required: "The field is required",
    //    oneOf: ''
  },
  string: {
    email: "You have entered wrong email address",
    min({ min }) {
      return `The field must have at least ${min} characters`;
    },
    max({ max }) {
      return `The field must have at least ${max} characters`;
    },
  },
});

// Utils
const emailYup = Yup.string().email().max(255).required();
const passwordYup = Yup.string().min(
  6,
  "Password should have a minimum of 6 characters"
);

// Auth
export const loginSchema = Yup.object().shape({
  email: emailYup,
  password: passwordYup.required(),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().max(255),
  repeatNewPassword: Yup.string()
    .min(6, "Password should have a minimum of 6 characters")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export const registerSchema = Yup.object().shape({
  firstname: Yup.string().max(255).required(),
  lastname: Yup.string().max(255).required(),
  email: emailYup,
  password: passwordYup.required(),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(),
});

export const updateUserSchema = Yup.object().shape({
  firstname: Yup.string().max(255).required(),
  lastname: Yup.string().max(255).required(),
  note: Yup.string(),
  experience: Yup.string().required(),
  password: passwordYup,
  repeatPassword: Yup.string().when("password", (password, field) =>
    password[0]
      ? field.required().oneOf([Yup.ref("password")], "Passwords must match")
      : field.notRequired()
  ),
});

export const updateExperienceSchema = Yup.object().shape({
  experience: Yup.string().required(),
});
