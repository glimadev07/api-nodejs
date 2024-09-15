import { TransactionRepository } from "../../application/ports/transactionRepository";
import { Transaction } from "../../domain/entities/transaction";

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Map<string, Transaction> = new Map();

  async create(transaction: Transaction): Promise<void> {
    this.transactions.set(transaction.id, transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactions.get(id) || null;
  }

  async getMonthlyTotal(): Promise<number> {
    const now = new Date();
    const currentMonth = now.getMonth();
    let total = 0;
    for (const transaction of this.transactions.values()) {
      if (transaction.date.getMonth() === currentMonth) {
        total += transaction.amount;
      }
    }
    return total;
  }
}
