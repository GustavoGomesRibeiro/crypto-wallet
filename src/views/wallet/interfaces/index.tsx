export interface AddWallet {
  name: string;
  description: string;
  user_id: number;
}

export interface CreateTransition {
  name: string;
  abbreviation: string;
  quantity: number;
  price: string;
  fees?: string;
  typeId: number;
  walletId: number;
}
