export interface PixKeyService {
  getAccountData(pixKey: string): Promise<{ account: string; bank: string }>;
}
