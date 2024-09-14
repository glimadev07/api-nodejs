import * as express from "express";
import { Express } from "express";
import * as cors from "cors";

export default function cretateServer(): Express {
  console.log("Starting application");
  const server = express();
  server.use(express.json());
  server.use(cors());
  return server;
}
