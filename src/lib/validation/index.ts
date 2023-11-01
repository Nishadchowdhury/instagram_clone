import * as z from "zod";

export const signupValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Too Short" })
    .max(60, { message: "Too Long." }),
  username: z.string().min(2, { message: "Too Short" }),
  email: z.string().email({ message: "Provide a valid email!" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export const signinValidation = z.object({
  email: z.string().email({ message: "Provide a valid email!" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});
