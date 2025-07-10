import React, { useEffect, useState } from 'react';

function PulseTable() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/pulsos')
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []);

  return (
    <div style={{ marginTop: '30px', padding: '10px' }}>
      <h3>📊 Registros de Pulsos</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Pulso</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.edad}</td>
              <td>{item.pulso}</td>
              <td>{new Date(item.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PulseTable;
