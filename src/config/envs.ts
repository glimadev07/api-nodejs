import dotenv from "dotenv";
import path from "path";

class Envs {
  private static instance: Envs;

  public readonly SERVER_PORT: number;
  public readonly DATABASE_URL: string;
  public readonly JWT_SECRET: string;

  private constructor() {
    const result = dotenv.config({
      path: path.resolve(process.cwd(), ".env"),
    });

    if (result.error) {
      throw result.error;
    }

    this.SERVER_PORT = parseInt(process.env.PORT as string, 10) || 3000;
    this.DATABASE_URL = process.env.DATABASE_URL as string;
    this.JWT_SECRET = process.env.JWT_SECRET as string;

    this.validateEnv();
  }

  public static getInstance(): Envs {
    if (!Envs.instance) {
      Envs.instance = new Envs();
    }
    return Envs.instance;
  }

  private validateEnv() {
    if (!this.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables.");
    }
    if (!this.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
  }
}

export default Envs.getInstance();
