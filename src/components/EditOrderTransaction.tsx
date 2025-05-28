// src/components/EditOrderTransaction.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { OrderTransaction, TransactionStatus } from '../types/OrderTransaction';
import { User } from '../types/user';
import { Product } from '../types/product';

const EditOrderTransaction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<OrderTransaction | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`/orders-transactions/${id}`),
      axios.get('/users'),
      axios.get('/makeup'),
    ])
      .then(([transactionResponse, usersResponse, productsResponse]) => {
        setTransaction(transactionResponse.data);
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
        setSelectedProducts(transactionResponse.data.products.map((p: Product) => p.id));
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Error al cargar datos: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction(prev => {
      if (!prev) return null;
  
      const updatedTransaction = {
        ...prev,
        [name]: name === 'total_amount' ? Number(value) : value,
      };
  
      if (name === 'client_id') {
        updatedTransaction.client = { id: value };
      }
  
      return updatedTransaction;
    });
  };
  
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setSelectedProducts(selectedOptions);
    setTransaction(prev => {
      if (!prev) return null;
  
      return {
        ...prev,
        products: selectedOptions.map(id => ({ id })),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;

    setError(null);
    setSuccess(null);

    try {
      await axios.patch(`/orders-transactions/${id}`, {
        client_id: transaction.client.id,
        products: transaction.products.map(p => p.id),
        total_amount: transaction.total_amount,
        status: transaction.status,
      });
      setSuccess('Transacción actualizada exitosamente');
      setTimeout(() => navigate('/order-transactions'), 1000);
    } catch (err: any) {
      setError('Error al actualizar la transacción: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!transaction) return <p>No se encontró la transacción</p>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Editar Transacción</h1>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Cliente</label>
          <select
            id="client_id"
            name="client_id"
            value={transaction.client.id}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="products" className="block text-sm font-medium text-gray-700">Productos</label>
          <select
            id="products"
            name="products"
            multiple
            value={selectedProducts}
            onChange={handleProductChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">Monto Total</label>
          <input
            type="number"
            id="total_amount"
            name="total_amount"
            value={transaction.total_amount}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="status"
            name="status"
            value={transaction.status}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.values(TransactionStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Actualizar Transacción
        </button>
      </form>
    </div>
  );
};

export default EditOrderTransaction;