import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { User } from '../types/user';
import { Product } from '../types/product';
 
const CreateProductTest: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tester_id: '', // Cambiado a tester_id según el backend
    product_id: '', // Cambiado a product_id según el backend
    reaction: '', // Nuevo campo
    rating: 5, // Nuevo campo, valor predeterminado
    survival_status: 1, // Nuevo campo, valor predeterminado (1 para true, 0 para false)
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
    // Para 'rating' y 'survival_status', convertir el valor a número
    if (name === 'rating' || name === 'survival_status') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
 
    try {
      await axios.post('/product-tests', formData);
      setSuccess('Prueba creada exitosamente');
      setTimeout(() => navigate('/product-tests'), 1000);
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
          <label htmlFor="tester_id" className="block text-sm font-medium text-gray-700">Tester</label>
          <select
            id="tester_id"
            name="tester_id"
            value={formData.tester_id}
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
          <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Producto</label>
          <select
            id="product_id"
            name="product_id"
            value={formData.product_id}
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
          <label htmlFor="reaction" className="block text-sm font-medium text-gray-700">Reacción</label>
          <input
            type="text"
            id="reaction"
            name="reaction"
            value={formData.reaction}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Puntuación (1-10)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            min="1"
            max="10"
            required
          />
        </div>
        <div>
          <label htmlFor="survival_status" className="block text-sm font-medium text-gray-700">¿Sobrevivió el tester?</label>
          <select
            id="survival_status"
            name="survival_status"
            value={formData.survival_status}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Crear Prueba
        </button>
      </form>
    </div>
  );
};
 
export default CreateProductTest;