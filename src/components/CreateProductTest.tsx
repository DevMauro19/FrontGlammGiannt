// src/components/CreateProductTest.tsx
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../api/axios';
import { User } from '../types/user';
import { Product } from '../types/product';

const CreateProductTest: React.FC = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    testerId: '',
    productId: '',
    testDate: '',
    result: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Cargar testers y productos para los select
    Promise.all([
      axios.get('/users'),
      axios.get('/makeup'),
    ])
      .then(([usersResponse, productsResponse]) => {
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
      })
      .catch(err => {
        setError('Error al cargar datos: ' + (err as Error).message);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post('/product-tests', formData);
      setSuccess('Prueba creada exitosamente');
      setTimeout(() => history.push('/product-tests'), 1000);
    } catch (err) {
      setError('Error al crear la prueba: ' + (err as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Prueba</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="testerId" className="block text-sm font-medium text-gray-700">Tester</label>
          <select
            id="testerId"
            name="testerId"
            value={formData.testerId}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecciona un tester</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Producto</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecciona un producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="testDate" className="block text-sm font-medium text-gray-700">Fecha de Prueba</label>
          <input
            type="date"
            id="testDate"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="result" className="block text-sm font-medium text-gray-700">Resultado</label>
          <input
            type="text"
            id="result"
            name="result"
            value={formData.result}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Crear Prueba
        </button>
      </form>
    </div>
  );
};

export default CreateProductTest;