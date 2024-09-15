import { PixKeyService } from "../../application/ports/pixKeyService";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class HttpPixKeyService implements PixKeyService {
  private pixApiHost = process.env.PIXI_API_HOST || "http://localhost:3001";

  async getAccountData(
    pixKey: string,
  ): Promise<{ account: string; bank: string }> {
    try {
      const response = await axios.get(`${this.pixApiHost}/pixKey/${pixKey}`);
      const data = response.data;

      if (!data) {
        throw new Error("PIX Key not found");
      }

      return {
        account: data.account,
        bank: data.bank,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching account data");
    }
  }
}
