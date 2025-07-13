import { useState, useEffect, useCallback, useRef } from 'react';
import { analizarPulso, obtenerEstadisticas, validarEntrada } from '../utils/analizarpulso';
import apiService from '../services/apiService';

export const useChatLogic = () => {
  const [mensajes, setMensajes] = useState([
    { 
      id: 1, 
      texto: '¡Hola! Soy tu asistente de salud cardíaca 💓\n\nEscribe tu frecuencia cardíaca y te ayudaré a interpretarla.\n\n💡 Puedes escribir:\n• Solo números: "75"\n• Con contexto: "Mi pulso es 80 después del ejercicio"\n• Especificar edad: "Mi bebé tiene 120 pulsaciones"\n• O seleccionar un paciente del backend para analizar sus datos', 
      usuario: false,
      timestamp: new Date().toISOString()
    }
  ]);
  
  const [inputTexto, setInputTexto] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [errores, setErrores] = useState([]);
  const [configuracion, setConfiguracion] = useState({
    tiempoRespuesta: 1000,
    mostrarEstadisticas: true,
    guardarHistorial: true,
    conectarBackend: true
  });
  
  // Estados para integración con backend
  const [backendConnected, setBackendConnected] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [backendData, setBackendData] = useState(null);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Función para hacer scroll automático
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Efecto para scroll automático
  useEffect(() => {
    scrollToBottom();
  }, [mensajes, scrollToBottom]);

  // Efecto para actualizar estadísticas
  useEffect(() => {
    if (configuracion.mostrarEstadisticas && historial.length > 0) {
      const stats = obtenerEstadisticas(historial);
      setEstadisticas(stats);
    }
  }, [historial, configuracion.mostrarEstadisticas]);

  // Efecto para limpiar timeouts
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Efecto para conectar al backend
  useEffect(() => {
    if (configuracion.conectarBackend) {
      apiService.connectWebSocket('chat-pulso');
      
      // Escuchar cambios de conexión
      const checkConnection = () => {
        const status = apiService.getConnectionStatus();
        setBackendConnected(status.isConnected);
      };

      const interval = setInterval(checkConnection, 2000);
      
      // Escuchar datos del backend
      apiService.onMessage('VITAL_DATA', handleBackendData);
      apiService.onMessage('REALTIME_DATA', handleBackendData);

      return () => {
        clearInterval(interval);
        apiService.offMessage('VITAL_DATA', handleBackendData);
        apiService.offMessage('REALTIME_DATA', handleBackendData);
      };
    }
  }, [configuracion.conectarBackend]);

  // Función para manejar datos del backend
  const handleBackendData = useCallback((data) => {
    console.log('📊 Datos del backend recibidos:', data);
    setBackendData(data);
    
    // Si hay un paciente seleccionado, analizar automáticamente
    if (selectedPatient && data.current) {
      analizarDatosBackend(data);
    }
  }, [selectedPatient]);

  // Función para agregar mensaje al historial
  const agregarAlHistorial = useCallback((analisis) => {
    if (configuracion.guardarHistorial && analisis.valor && !analisis.error) {
      setHistorial(prev => [...prev, analisis]);
    }
  }, [configuracion.guardarHistorial]);

  // Función para manejar errores
  const manejarError = useCallback((error) => {
    const nuevoError = {
      id: Date.now(),
      mensaje: error.message || 'Error desconocido',
      timestamp: new Date().toISOString(),
      tipo: error.tipo || 'general'
    };
    
    setErrores(prev => [...prev, nuevoError]);
    
    // Limpiar errores antiguos después de 5 segundos
    setTimeout(() => {
      setErrores(prev => prev.filter(e => e.id !== nuevoError.id));
    }, 5000);
  }, []);

  // Función para validar y procesar entrada
  const procesarEntrada = useCallback((texto) => {
    try {
      const validacion = validarEntrada(texto);
      
      if (!validacion.valido) {
        throw new Error(validacion.error);
      }
      
      return validacion.valor;
    } catch (error) {
      manejarError(error);
      return null;
    }
  }, [manejarError]);

  // Función para analizar datos del backend
  const analizarDatosBackend = useCallback(async (data) => {
    try {
      setIsTyping(true);
      
      // Simular tiempo de procesamiento
      await new Promise(resolve => {
        typingTimeoutRef.current = setTimeout(resolve, configuracion.tiempoRespuesta);
      });

      const mensaje = `📊 **Análisis de datos del paciente ${selectedPatient?.name || selectedPatient?.id}**\n\n` +
        `Frecuencia cardíaca actual: **${data.current} BPM**\n` +
        `Promedio: **${data.average} BPM**\n` +
        `Rango: **${data.min} - ${data.max} BPM**\n` +
        `Total de registros: **${data.totalRecords}**\n\n` +
        `Última actualización: ${new Date(data.lastUpdate).toLocaleString('es-ES')}`;

      const analisis = analizarPulso(data.current.toString());
      
      const respuestaBot = {
        id: Date.now() + 1,
        texto: mensaje,
        usuario: false,
        ...analisis,
        valor: data.current,
        source: 'backend',
        patientId: selectedPatient?.id
      };

      setMensajes(prev => [...prev, respuestaBot]);
      agregarAlHistorial(analisis);
      
    } catch (error) {
      manejarError(error);
    } finally {
      setIsTyping(false);
    }
  }, [selectedPatient, configuracion.tiempoRespuesta, agregarAlHistorial, manejarError]);

  // Función para generar respuesta del bot
  const generarRespuestaBot = useCallback(async (texto) => {
    try {
      setIsTyping(true);
      
      // Simular tiempo de procesamiento
      await new Promise(resolve => {
        typingTimeoutRef.current = setTimeout(resolve, configuracion.tiempoRespuesta);
      });
      
      const analisis = analizarPulso(texto);
      
      // Agregar al historial si es válido
      agregarAlHistorial(analisis);
      
      return {
        id: Date.now() + 1,
        texto: analisis.mensaje,
        usuario: false,
        ...analisis
      };
      
    } catch (error) {
      manejarError(error);
      return {
        id: Date.now() + 1,
        texto: '❌ Lo siento, hubo un error al procesar tu entrada. Por favor, intenta de nuevo.',
        usuario: false,
        error: true
      };
    } finally {
      setIsTyping(false);
    }
  }, [configuracion.tiempoRespuesta, agregarAlHistorial, manejarError]);

  // Función principal para enviar mensaje
  const enviarMensaje = useCallback(async () => {
    if (inputTexto.trim() === '' || isTyping) return;

    const textoLimpio = inputTexto.trim();
    setInputTexto('');

    // Crear mensaje del usuario
    const mensajeUsuario = {
      id: Date.now(),
      texto: textoLimpio,
      usuario: true,
      timestamp: new Date().toISOString()
    };

    // Agregar mensaje del usuario
    setMensajes(prev => [...prev, mensajeUsuario]);

    // Generar y agregar respuesta del bot
    const respuestaBot = await generarRespuestaBot(textoLimpio);
    setMensajes(prev => [...prev, respuestaBot]);

  }, [inputTexto, isTyping, generarRespuestaBot]);

  // Función para manejar teclas
  const manejarTeclas = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  }, [enviarMensaje]);

  // Función para limpiar historial
  const limpiarHistorial = useCallback(() => {
    setHistorial([]);
    setEstadisticas(null);
  }, []);

  // Función para exportar datos
  const exportarDatos = useCallback(() => {
    const datos = {
      historial,
      estadisticas,
      backendData,
      selectedPatient,
      fecha: new Date().toISOString(),
      totalMensajes: mensajes.length
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `salus-monitor-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [historial, estadisticas, backendData, selectedPatient, mensajes.length]);

  // Función para obtener sugerencias basadas en el contexto
  const obtenerSugerencias = useCallback((texto) => {
    const sugerencias = [];
    const textoLower = texto.toLowerCase();
    
    if (textoLower.includes('ejercicio') || textoLower.includes('deporte')) {
      sugerencias.push('🏃‍♂️ Durante el ejercicio es normal tener 120-180 BPM');
    }
    
    if (textoLower.includes('dormir') || textoLower.includes('sueño')) {
      sugerencias.push('😴 Durante el sueño la frecuencia puede bajar a 40-60 BPM');
    }
    
    if (textoLower.includes('estrés') || textoLower.includes('nervioso')) {
      sugerencias.push('😰 El estrés puede aumentar la frecuencia cardíaca');
    }
    
    if (textoLower.includes('bebé') || textoLower.includes('niño')) {
      sugerencias.push('👶 Los bebés tienen frecuencias más altas (80-160 BPM)');
    }

    // Sugerencias específicas del backend
    if (backendConnected && selectedPatient) {
      sugerencias.push(`📊 Analizando datos del paciente: ${selectedPatient.name || selectedPatient.id}`);
    }
    
    if (backendConnected && !selectedPatient) {
      sugerencias.push('🔌 Conectado al backend - Selecciona un paciente para analizar');
    }
    
    return sugerencias;
  }, [backendConnected, selectedPatient]);

  // Función para seleccionar paciente del backend
  const seleccionarPaciente = useCallback(async (patientId) => {
    try {
      const analysis = await apiService.analyzeBackendVitals(patientId);
      if (analysis.success) {
        setSelectedPatient(analysis.data);
        setBackendData(analysis.data);
        await analizarDatosBackend(analysis.data);
      }
    } catch (error) {
      manejarError(error);
    }
  }, [analizarDatosBackend, manejarError]);

  // Función para recibir datos del backend
  const recibirDatosBackend = useCallback((data) => {
    setBackendData(data);
    if (selectedPatient && data.current) {
      analizarDatosBackend(data);
    }
  }, [selectedPatient, analizarDatosBackend]);

  return {
    // Estado
    mensajes,
    inputTexto,
    setInputTexto,
    isTyping,
    historial,
    estadisticas,
    errores,
    configuracion,
    setConfiguracion,
    messagesEndRef,
    
    // Estados del backend
    backendConnected,
    selectedPatient,
    backendData,
    
    // Funciones
    enviarMensaje,
    manejarTeclas,
    limpiarHistorial,
    exportarDatos,
    obtenerSugerencias,
    procesarEntrada,
    
    // Funciones del backend
    seleccionarPaciente,
    recibirDatosBackend,
    
    // Utilidades
    scrollToBottom
  };
};