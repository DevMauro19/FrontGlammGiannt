export interface OrderTransaction {
    id: string;
    clientId: string;
    products: string[];
    totalAmount: number;
    paymentStatus: 'Paid' | 'Refunded' | 'Failed';
  }