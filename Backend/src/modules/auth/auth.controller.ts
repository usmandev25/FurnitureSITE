import { Request, Response } from "express";
import { registerService } from "./auth.service";
import { registerSchema } from "./auth.schemas";

export const register = async (
  req: Request<{}, {}, { user_name: string; email: string; password: string }>,
  res: Response
) => {
  try {
    const body = registerSchema.safeParse(req.body);
    if (!body.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: body.error.flatten().fieldErrors,
      });
    }
    const response = await registerService(body.data);
    res
      .status(201)
      .json({ message: "User created", status: "success", data: response });
  } catch (error: any) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "server error" });
  }
};
