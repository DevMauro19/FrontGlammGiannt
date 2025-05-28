
import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/apiCalls';
import { Product } from '../types/product';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - Stock: {product.stock}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;