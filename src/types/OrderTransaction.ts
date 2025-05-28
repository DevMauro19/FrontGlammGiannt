
import { Product } from './product';
import { User } from './user';

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderTransaction {
  id: string;
  client: User; // o al menos { id: string }
  products: Product[]; // o al menos { id: string }[]
  total_amount: number;
  status: TransactionStatus;
}