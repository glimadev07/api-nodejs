import { Request, Response, NextFunction } from "express";

export default function authorize(
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

  if (token !== "VALID_AUTH_TOKEN") {
    res.status(403).json({ error: "Invalid token" });
    return;
  }

  next();
}
