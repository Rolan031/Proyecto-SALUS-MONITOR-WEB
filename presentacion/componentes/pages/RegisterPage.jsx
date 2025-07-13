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
    <div className="min-h-screen bg-[#181e2a] text-white flex flex-col items-center justify-center px-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/10 to-black opacity-60" />
      <div className="z-10 max-w-md w-full bg-[#23283a]/80 backdrop-blur-xl p-7 rounded-2xl shadow-2xl border border-[#1aff8b]/20 flex flex-col items-center" style={{boxShadow:'0 8px 40px #1aff8b22'}}>
        <div className="w-full flex justify-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1aff8b] rounded-xl shadow-lg mb-2">
            <i className="fas fa-user-plus text-3xl text-white"></i>
          </div>
        </div>
        <div className="text-center mb-2">
          <h1 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Registrar Nuevo Paciente</h1>
          <p className="text-[#b6eada] text-sm">Completa los datos para iniciar el monitoreo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-semibold text-[#1aff8b] mb-1 flex items-center gap-2">
              <i className="fas fa-user"></i> Nombre del Paciente
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#19202b] border border-[#1aff8b]/30 rounded-lg focus:ring-2 focus:ring-[#1aff8b] outline-none text-white placeholder-gray-400 transition"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1aff8b] mb-1 flex items-center gap-2">
              <i className="fas fa-birthday-cake"></i> Edad
            </label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              min={0}
              max={120}
              className="w-full px-4 py-2 bg-[#19202b] border border-[#1aff8b]/30 rounded-lg focus:ring-2 focus:ring-[#1aff8b] outline-none text-white placeholder-gray-400 transition"
              placeholder="Ingresa tu edad"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1aff8b] mb-1 flex items-center gap-2">
              <i className="fas fa-venus-mars"></i> Género
            </label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#19202b] border border-[#1aff8b]/30 rounded-lg focus:ring-2 focus:ring-[#1aff8b] outline-none text-white transition"
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1aff8b] mb-1 flex items-center gap-2">
              <i className="fas fa-microchip"></i> Dispositivo
            </label>
            <select
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#19202b] border border-[#1aff8b]/30 rounded-lg focus:ring-2 focus:ring-[#1aff8b] outline-none text-white transition"
            >
              <option value="">Seleccionar dispositivo</option>
              <option value="ESP32_001">ESP32</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1aff8b] hover:bg-[#13c77b] text-[#10151f] rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
            disabled={isLoading}
          >
            <i className="fas fa-user-check"></i> Registrar y Monitorear
          </button>
        </form>

        {/* Indicador de conexión decorativo */}
        <div className="mt-3 text-xs text-center text-[#b6eada] animate-pulse flex items-center justify-center gap-2">
          <i className="fas fa-broadcast-tower text-[#1aff8b]"></i> Listo para monitoreo en tiempo real
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
