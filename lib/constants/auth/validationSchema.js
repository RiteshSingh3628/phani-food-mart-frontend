import { z } from "zod";

const LOGIN_SCHEMA = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LOGIN_DEFAULT_VALUES = {
  email: "",
  password: "",
};

const SIGNUP_SCHEMA = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SIGNUP_DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
};

export {
  LOGIN_SCHEMA,
  SIGNUP_SCHEMA,
  LOGIN_DEFAULT_VALUES,
  SIGNUP_DEFAULT_VALUES,
};
