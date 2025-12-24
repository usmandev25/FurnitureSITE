import { z } from "zod";

export const registerSchema = z.object({
  user_name: z.string().toLowerCase().trim(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Неверный email")
    .endsWith("gmail.com", "Email должен заканчивать на @gmail.com"),

  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .max(32, "Слишком длинный пароль")
    .regex(/[A-Z]/, "Добавь заглавную букву")
    .regex(/[a-z]/, "Добавь строчную букву")
    .regex(/[0-9]/, "Добавь цифру")
    .regex(/[^A-Za-z0-9]/, "Добавь спецсимвол"),
});
