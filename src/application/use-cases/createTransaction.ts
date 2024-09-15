import { TransactionRepository } from "../ports/transactionRepository";
import { PixKeyService } from "../ports/pixKeyService";
import { Transaction } from "../../domain/entities/transaction";
import { Payment } from "../../domain/value-objects/Payment";
import { v4 as uuidv4 } from "uuid";

export class CreateTransaction {
  constructor(
    private transactionRepository: TransactionRepository,
    private pixKeyService: PixKeyService,
  ) {}

  async execute(payment: Payment): Promise<Transaction> {
    const { amount, pixKey } = payment;

    const now = new Date();
    const hour = now.getUTCHours();
    const monthlyTotal = await this.transactionRepository.getMonthlyTotal();
    const newMonthlyTotal = monthlyTotal + amount;

    if (
      (amount > 1000 && (hour >= 20 || hour < 6)) ||
      (amount > 15000 && hour >= 5 && hour < 20) ||
      newMonthlyTotal > 30000
    ) {
      throw new Error("Transaction blocked due to policy restrictions");
    }

    const accountData = await this.pixKeyService.getAccountData(pixKey);

    if (!accountData) {
      throw new Error("Invalid PIX key");
    }

    const transaction = new Transaction(
      uuidv4(),
      amount,
      pixKey,
      accountData.account,
      accountData.bank,
      now,
    );

    await this.transactionRepository.create(transaction);

    return transaction;
  }
}
