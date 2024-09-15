// src/config/create-server.ts

import express from "express";
import { Express } from "express";
import cors from "cors";

export function createServer(): Express {
  console.log("Starting application");
  const server = express();
  server.use(express.json());
  server.use(cors());
  return server;
}
