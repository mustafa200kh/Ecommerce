import { z } from "zod";

// zod validation
const registerSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "First name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password should be at least 8 characters" })
      .regex(/[*@!#%&()^~{}]+/, {
        message: "you password should contains at least 1 special character",
      }),
    confirmpassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmpassword, {
    message: "password is not matched",
    path: ["confirmpassword"],
  });

// type of the inputs for the form
type TRegisterInputs = z.infer<typeof registerSchema>;

export { registerSchema, type TRegisterInputs };
