import { Transaction } from "../../domain/entities/transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  getMonthlyTotal(): Promise<number>;
}
