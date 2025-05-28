import React, { useEffect, useState } from 'react';
import API from '../api/axios';

interface Test {
  id: number;
  result: string;
  date: string;
}

const Tests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    API.get('/tests')
      .then(res => setTests(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Resultados de Pruebas</h2>
      <ul>
        {tests.map(test => (
          <li key={test.id}>{test.result} - {test.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tests;
