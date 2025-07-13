import React, { useState } from 'react';

const PatientRegistration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.nombre || !formData.edad || !formData.genero) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setError(null);
    onRegister(formData);

    // Limpiar formulario tras enviar
    setFormData({
      nombre: '',
      edad: '',
      genero: ''
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#23283a]/90 px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full mx-auto border-none outline-none"
    >
      <h2 className="text-xl font-bold text-white mb-3 flex items-center">
        <i className="fas fa-user-plus mr-2 text-green-400" />
        Registrar Paciente
      </h2>

      {error && (
        <div className="mb-2 text-xs text-red-400 bg-red-900/30 border border-red-500/20 p-2 rounded-lg">
          ❌ {error}
        </div>
      )}

      <div className="mb-2">
        <label htmlFor="nombre" className="block text-xs text-gray-300 mb-1">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="edad" className="block text-xs text-gray-300 mb-1">Edad</label>
        <input
          id="edad"
          name="edad"
          type="number"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
          className="w-full px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="genero" className="block text-xs text-gray-300 mb-1">Género</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className="w-full px-3 py-1.5 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        >
          <option value="">Seleccionar</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300"
      >
        🩺 Registrar y Monitorear
      </button>

      <p className="text-xs text-gray-400 mt-2 text-center">
        🔄 Listo para monitoreo en tiempo real
      </p>
    </form>
  );
};

export default PatientRegistration;
