import React, { useEffect, useState } from 'react';
import { getOrderTransactions } from '../api/apiCalls';
import { OrderTransaction } from '../types/OrderTransaction';

const OrderTransactionsPage: React.FC = () => {
  const [orderTransactions, setOrderTransactions] = useState<OrderTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderTransactions = async () => {
      try {
        const data = await getOrderTransactions();
        setOrderTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order transactions:', error);
        setLoading(false);
      }
    };
    fetchOrderTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Transactions Page</h1>
      <ul>
        {orderTransactions.map(transaction => (
          <li key={transaction.id}>
            Client ID: {transaction.clientId} - Total: ${transaction.totalAmount} - Status: {transaction.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderTransactionsPage;