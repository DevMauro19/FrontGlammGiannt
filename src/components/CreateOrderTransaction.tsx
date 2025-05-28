import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { User } from '../types/user';
import { Product } from '../types/product';
import { TransactionStatus } from '../types/OrderTransaction';

const CreateOrderTransaction: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client_id: '', // ID del cliente para el formulario
    product_ids: [] as string[], // IDs de productos para el formulario
    total_amount: 0,
    status: TransactionStatus.PENDING, // Usamos TransactionStatus
  });
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      axios.get('/users'),
      axios.get('/makeup'),
    ])
      .then(([usersResponse, productsResponse]) => {
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
      })
      .catch(err => {
        setError('Error al cargar datos: ' + (err.response?.data?.message || err.message));
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total_amount' ? Number(value) : value,
    }));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, product_ids: selectedOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Mapear los datos del formulario al formato esperado por la API
      const payload = {
        client_id: formData.client_id,
        product_ids: formData.product_ids, // Enviar IDs de productos
        total_amount: formData.total_amount,
        status: formData.status,
      };

      await axios.post('/orders-transactions', payload);
      setSuccess('Transacción creada exitosamente');
      setTimeout(() => navigate('/order-transactions'), 1000);
    } catch (err: any) {
      setError('Error al crear la transacción: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Transacción</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Cliente</label>
          <select
            id="client_id"
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecciona un cliente</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product_ids" className="block text-sm font-medium text-gray-700">Productos</label>
          <select
            id="product_ids"
            name="product_ids"
            multiple
            value={formData.product_ids}
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
            value={formData.total_amount}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.values(TransactionStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Crear Transacción
        </button>
      </form>
    </div>
  );
};

export default CreateOrderTransaction;