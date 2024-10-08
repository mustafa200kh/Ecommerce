import { z } from "zod";

// zod validation

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required field" }).email(),
  password: z.string().min(1, { message: "Password is required field" }),
});

type TLoginForm = z.infer<typeof loginSchema>;

export { loginSchema, type TLoginForm };
