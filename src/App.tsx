// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import UsersPage from './Pages/UserPage';
import ProductsPage from './Pages/Products';
import ProductTestsPage from './Pages/Tests';
import OrderTransactionsPage from './Pages/orderTransactionsPage';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import CreateProductTest from './components/CreateProductTest';
import EditProductTest from './components/EditProductTest';
import CreateOrderTransaction from './components/CreateOrderTransaction';
import EditOrderTransaction from './components/EditOrderTransaction';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/product-tests" element={<ProductTestsPage />} />
        <Route path="/product-tests/create" element={<CreateProductTest />} />
        <Route path="/product-tests/edit/:id" element={<EditProductTest />} />
        <Route path="/order-transactions" element={<OrderTransactionsPage />} />
        <Route path="/order-transactions/create" element={<CreateOrderTransaction />} />
        <Route path="/order-transactions/edit/:id" element={<EditOrderTransaction />} />
      </Routes>
    </Router>
  );
};

export default App;