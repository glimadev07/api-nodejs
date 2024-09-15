export class Transaction {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly pixKey: string,
    public readonly account: string,
    public readonly bank: string,
    public readonly date: Date,
  ) {}
}
