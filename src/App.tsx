import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home';
import UsersPage from './Pages/UserPage';
import Products from './Pages/Products';
import Tests from './Pages/Tests';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ margin: '0 1rem' }}>Inicio</Link>
          <Link to="/users" style={{ margin: '0 1rem' }}>Usuarios</Link>
          <Link to="/products" style={{ margin: '0 1rem' }}>Productos</Link>
          <Link to="/tests" style={{ margin: '0 1rem' }}>Pruebas</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
