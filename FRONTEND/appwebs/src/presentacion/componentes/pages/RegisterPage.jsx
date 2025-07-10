import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVitalMonitorContext } from '../../contexts/VitalMonitorContext';
// En RegisterPage.jsx
import apiClient from '../../../infrastructure/api/apiClient';
const RegisterPage = () => {
  const [formData, setFormData] = useState({ nombre: '', edad: '', genero: '', deviceId: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useVitalMonitorContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convertir edad a número
      const patientData = {
        ...formData,
        edad: parseInt(formData.edad, 10),
        deviceId: formData.deviceId || 'ESP32_DEFAULT'
      };
      
      const response = await apiClient.post('/api/clientes', patientData);
      
      // Crear el dispositivo asociado al paciente
      if (formData.deviceId) {
        try {
          await apiClient.post('/api/devices', {
            deviceId: formData.deviceId,
            patientId: response.id
          });
        } catch (deviceError) {
          console.error('Error creating device:', deviceError);
          // Continuar aunque falle la creación del dispositivo
        }
      }
      
      dispatch({ type: 'SET_CURRENT_PATIENT', payload: response });
      navigate('/monitor');
    } catch (error) {
      console.error('Error registering patient:', error);
      let errorMessage = 'Error registering patient. Check the data or try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/10 to-black opacity-60" />
      <div className="z-10 max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl border border-green-500/20">
        <div className="w-full flex justify-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl shadow-green-500/20 mb-4">
            <i className="fas fa-user-plus text-2xl text-white"></i>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Registrar Nuevo Paciente
          </h1>
          <p className="text-gray-400 text-sm">
            Completa los datos para iniciar el monitoreo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-user mr-2 text-green-400"></i>
              Nombre del Paciente
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-birthday-cake mr-2 text-green-400"></i>
              Edad
            </label>            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              min={0}
              max={120}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Ingresa tu edad"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-venus-mars mr-2 text-green-400"></i>
              Género
            </label>            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-microchip mr-2 text-green-400"></i>
              Dispositivo
            </label>
            <select
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Seleccionar dispositivo</option>
              <option value="ESP32_001">ESP32</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i> Registrando...
              </>
            ) : (
              <>
                <i className="fas fa-user-check mr-2"></i> Registrar y Monitorear
              </>
            )}
          </button>
        </form>

        {/* Indicador de conexión decorativo */}
        <div className="mt-6 text-sm text-center text-gray-400 animate-pulse">
          <i className="fas fa-broadcast-tower mr-2 text-green-400"></i> Listo para monitoreo en tiempo real
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
