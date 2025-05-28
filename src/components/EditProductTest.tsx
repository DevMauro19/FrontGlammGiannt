// src/components/EditProductTest.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from '../api/axios';
import { ProductTest } from '../types/productTest';
import { User } from '../types/user';
import { Product } from '../types/product';

const EditProductTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [test, setTest] = useState<ProductTest | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`/product-tests/${id}`),
      axios.get('/users'),
      axios.get('/makeup'),
    ])
      .then(([testResponse, usersResponse, productsResponse]) => {
        setTest(testResponse.data);
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar datos: ' + (err as Error).message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTest(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!test) return;

    setError(null);
    setSuccess(null);

    try {
      await axios.patch(`/product-tests/${id}`, test);
      setSuccess('Prueba actualizada exitosamente');
      setTimeout(() => history.push('/product-tests'), 1000);
    } catch (err) {
      setError('Error al actualizar la prueba: ' + (err as Error).message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!test) return <p>No se encontró la prueba</p>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Editar Prueba</h1>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="testerId" className="block text-sm font-medium text-gray-700">Tester</label>
          <select
            id="testerId"
            name="testerId"
            value={test.tester.id}
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
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Producto</label>
          <select
            id="productId"
            name="productId"
            value={test.product.id}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
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
            value={test.testDate}
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
            value={test.result}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600說明: `useHistory` ha sido reemplazado por `useNavigate` en las versiones más recientes de `react-router-dom` (a partir de la versión 6). Te mostraré cómo adaptar el código usando `useNavigate`.

---

### Adaptación del código con `useNavigate`

#### 1. **Para `CreateProductTest.tsx`**
```tsx
// src/components/CreateProductTest.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado de useHistory a useNavigate
import axios from '../api/axios';
import { User } from '../types/user';
import { Product } from '../types/product';

const CreateProductTest: React.FC = () => {
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate
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
      setTimeout(() => navigate('/product-tests'), 1000); // Cambiado history.push a navigate
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