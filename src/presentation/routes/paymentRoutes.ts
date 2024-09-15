import { Application, Request, Response } from "express";
import { authorize } from "../middleware/authorize";
import { InMemoryTransactionRepository } from "../../infrastructure/adapters/inMemoryTransactionRepository";
import { HttpPixKeyService } from "../../infrastructure/adapters/httpPixKeyService";
import { CreateTransaction } from "../../application/use-cases/createTransaction";
import { GetTransaction } from "../../application/use-cases/getTransaction";

const transactionRepository = new InMemoryTransactionRepository();
const pixKeyService = new HttpPixKeyService();

const createTransaction = new CreateTransaction(
  transactionRepository,
  pixKeyService,
);
const getTransaction = new GetTransaction(transactionRepository);

export function initPaymentRoutes(app: Application) {
  app.get("/payment/:id", authorize, async (req: Request, res: Response) => {
    const id = req.params.id;
    const transaction = await getTransaction.execute(id);

    if (!transaction) {
      return res.status(404).send("Transaction not found");
    }

    res.json(transaction);
  });

  app.post("/payment", authorize, async (req: Request, res: Response) => {
    const { amount, pixKey } = req.body;

    try {
      const transaction = await createTransaction.execute({ amount, pixKey });
      res.json(transaction);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });
}
