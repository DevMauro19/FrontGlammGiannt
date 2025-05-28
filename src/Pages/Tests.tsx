import React, { useEffect, useState } from 'react';
import { getProductTests } from '../api/apiCalls';
import { ProductTest } from '../types/productTest';

const ProductTestsPage: React.FC = () => {
  const [productTests, setProductTests] = useState<ProductTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductTests = async () => {
      try {
        const data = await getProductTests();
        setProductTests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product tests:', error);
        setLoading(false);
      }
    };
    fetchProductTests();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Product Tests Page</h1>
      <ul>
        {productTests.map(test => (
          <li key={test.id}>
            Tester ID: {test.testerId} - Product ID: {test.productId} - Rating: {test.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTestsPage;