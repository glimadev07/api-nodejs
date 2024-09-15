import { TransactionRepository } from "../ports/transactionRepository";
import { Transaction } from "../../domain/entities/transaction";

export class GetTransaction {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }
}
