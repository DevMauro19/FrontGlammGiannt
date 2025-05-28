import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { ProductTest } from '../types/productTest'; // Asumiendo que el tipo ProductTest ha sido actualizado
import { User } from '../types/user';
import { Product } from '../types/product';
 
const EditProductTest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
        // Ajustar el estado inicial de la prueba para que coincida con la estructura DTO esperada por el backend.
        // El backend devuelve la entidad ProductTest completa, por lo que necesitamos extraer los IDs.
        setTest({
          ...testResponse.data,
          tester_id: testResponse.data.tester.id,
          product_id: testResponse.data.product.id,
          survival_status: testResponse.data.survival_status ? 1 : 0, // Convertir booleano a número
        });
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
    setTest(prev => {
      if (!prev) return null;
 
      // Para 'rating' y 'survival_status', convertir el valor a número
      if (name === 'rating' || name === 'survival_status') {
        return { ...prev, [name]: Number(value) };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!test) return;
 
    setError(null);
    setSuccess(null);
 
    // Crear un objeto DTO a partir del estado actual de la prueba
    const updateDto = {
      tester_id: test.tester_id,
      product_id: test.product_id,
      reaction: test.reaction,
      rating: test.rating,
      survival_status: test.survival_status?1:0,
    };
 
    try {
      await axios.patch(`/product-tests/${id}`, updateDto); // Enviar el DTO
      setSuccess('Prueba actualizada exitosamente');
      setTimeout(() => navigate('/product-tests'), 1000);
    } catch (err) {
      setError('Error al actualizar la prueba: ' + (err as Error).message);
    }
  };
 
  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!test) return <p>No se encontró la prueba</p>;
 
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Editar Prueba</h1>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tester_id" className="block text-sm font-medium text-gray-700">Tester</label>
          <select
            id="tester_id"
            name="tester_id"
            value={test.tester_id} // Usar tester_id del estado
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
          <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Producto</label>
          <select
            id="product_id"
            name="product_id"
            value={test.product_id} // Usar product_id del estado
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
          <label htmlFor="reaction" className="block text-sm font-medium text-gray-700">Reacción</label>
          <input
            type="text"
            id="reaction"
            name="reaction"
            value={test.reaction || ''} // Asegurarse de que no sea null/undefined
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
            value={test.rating}
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
            value={Number(test.survival_status)} // Usar survival_status del estado como número
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Actualizar Prueba
        </button>
      </form>
    </div>
  );
};
 
export default EditProductTest;