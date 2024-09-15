import { Request, Response, NextFunction } from "express";
import envs from "../../config/envs";

export function authorize(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(403).json({ error: "Authorization token not provided" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Assuming format 'Bearer TOKEN'

  if (token !== envs.JWT_SECRET) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }

  next();
}
