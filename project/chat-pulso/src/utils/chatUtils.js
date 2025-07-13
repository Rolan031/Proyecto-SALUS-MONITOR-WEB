// Utilidades para el chat de pulso

// Función para formatear timestamp
export const formatearTimestamp = (timestamp) => {
  const fecha = new Date(timestamp);
  const ahora = new Date();
  const diferencia = ahora - fecha;
  
  // Menos de 1 minuto
  if (diferencia < 60000) {
    return 'Ahora';
  }
  
  // Menos de 1 hora
  if (diferencia < 3600000) {
    const minutos = Math.floor(diferencia / 60000);
    return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
  }
  
  // Menos de 24 horas
  if (diferencia < 86400000) {
    const horas = Math.floor(diferencia / 3600000);
    return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
  }
  
  // Más de 24 horas
  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Función para obtener el color de prioridad
export const obtenerColorPrioridad = (prioridad) => {
  switch (prioridad) {
    case 1:
      return '#ef4444'; // Rojo - Crítico
    case 2:
      return '#f59e0b'; // Naranja - Advertencia
    case 3:
      return '#10b981'; // Verde - Normal
    default:
      return '#6b7280'; // Gris - Desconocido
  }
};

// Función para validar y limpiar entrada de texto
export const limpiarEntrada = (texto) => {
  return texto
    .trim()
    .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno
    .replace(/[^\w\s\dáéíóúñÁÉÍÓÚÑ]/g, ''); // Remover caracteres especiales excepto acentos
};

// Función para detectar el idioma del texto
export const detectarIdioma = (texto) => {
  const palabras = texto.toLowerCase().split(/\s+/);
  
  // Palabras comunes en español
  const palabrasEspanol = ['mi', 'el', 'la', 'es', 'está', 'tiene', 'pulso', 'frecuencia', 'cardíaca', 'bpm'];
  const palabrasIngles = ['my', 'the', 'is', 'has', 'pulse', 'heart', 'rate', 'bpm'];
  
  const espanolCount = palabras.filter(palabra => palabrasEspanol.includes(palabra)).length;
  const inglesCount = palabras.filter(palabra => palabrasIngles.includes(palabra)).length;
  
  if (espanolCount > inglesCount) {
    return 'es';
  } else if (inglesCount > espanolCount) {
    return 'en';
  }
  
  return 'es'; // Por defecto español
};

// Función para generar ID único
export const generarId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Función para calcular tendencia de datos
export const calcularTendencia = (valores) => {
  if (valores.length < 2) return 'estable';
  
  const cambios = [];
  for (let i = 1; i < valores.length; i++) {
    cambios.push(valores[i] - valores[i - 1]);
  }
  
  const promedioCambio = cambios.reduce((a, b) => a + b, 0) / cambios.length;
  
  if (promedioCambio > 5) return 'ascendente';
  if (promedioCambio < -5) return 'descendente';
  return 'estable';
};

// Función para obtener recomendaciones basadas en tendencia
export const obtenerRecomendacionesTendencia = (tendencia, ultimoValor) => {
  const recomendaciones = [];
  
  switch (tendencia) {
    case 'ascendente':
      recomendaciones.push(
        '📈 Tu frecuencia cardíaca está aumentando',
        '😌 Considera técnicas de relajación',
        '💧 Mantente hidratado',
        '🛌 Asegúrate de descansar adecuadamente'
      );
      break;
      
    case 'descendente':
      recomendaciones.push(
        '📉 Tu frecuencia cardíaca está disminuyendo',
        '✅ Esto puede ser positivo si estás relajado',
        '🏃‍♂️ Si haces ejercicio, es normal',
        '😴 Durante el sueño es esperado'
      );
      break;
      
    case 'estable':
      recomendaciones.push(
        '📊 Tu frecuencia cardíaca se mantiene estable',
        '✅ Esto indica buena salud cardiovascular',
        '💪 Continúa con tu rutina actual',
        '🥗 Mantén hábitos saludables'
      );
      break;
  }
  
  return recomendaciones;
};

// Función para exportar datos en diferentes formatos
export const exportarDatos = (datos, formato = 'json') => {
  let contenido, tipoMIME, extension;
  
  switch (formato) {
    case 'csv':
      contenido = convertirACSV(datos);
      tipoMIME = 'text/csv';
      extension = 'csv';
      break;
      
    case 'txt':
      contenido = convertirATexto(datos);
      tipoMIME = 'text/plain';
      extension = 'txt';
      break;
      
    default:
      contenido = JSON.stringify(datos, null, 2);
      tipoMIME = 'application/json';
      extension = 'json';
  }
  
  const blob = new Blob([contenido], { type: tipoMIME });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `salus-monitor-${new Date().toISOString().split('T')[0]}.${extension}`;
  a.click();
  URL.revokeObjectURL(url);
};

// Función auxiliar para convertir a CSV
const convertirACSV = (datos) => {
  const headers = ['Fecha', 'Frecuencia Cardíaca', 'Estado', 'Rango Normal', 'Prioridad'];
  const filas = datos.historial.map(item => [
    new Date(item.timestamp).toLocaleString('es-ES'),
    item.valor,
    item.estado,
    item.rangoNormal,
    item.prioridad
  ]);
  
  return [headers, ...filas]
    .map(fila => fila.map(campo => `"${campo}"`).join(','))
    .join('\n');
};

// Función auxiliar para convertir a texto
const convertirATexto = (datos) => {
  let texto = '=== REPORTE SALUS MONITOR ===\n\n';
  texto += `Fecha de generación: ${new Date().toLocaleString('es-ES')}\n`;
  texto += `Total de registros: ${datos.historial.length}\n\n`;
  
  if (datos.estadisticas) {
    texto += '=== ESTADÍSTICAS ===\n';
    texto += `Promedio: ${datos.estadisticas.promedio} BPM\n`;
    texto += `Mínimo: ${datos.estadisticas.min} BPM\n`;
    texto += `Máximo: ${datos.estadisticas.max} BPM\n`;
    texto += `Estado más común: ${datos.estadisticas.estadoMasComun}\n`;
    texto += `Tendencia: ${datos.estadisticas.tendencia}\n\n`;
  }
  
  texto += '=== HISTORIAL ===\n';
  datos.historial.forEach((item, index) => {
    texto += `${index + 1}. ${new Date(item.timestamp).toLocaleString('es-ES')} - ${item.valor} BPM (${item.estado})\n`;
  });
  
  return texto;
};

// Función para guardar datos en localStorage
export const guardarEnLocalStorage = (clave, datos) => {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
    return true;
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
    return false;
  }
};

// Función para cargar datos de localStorage
export const cargarDeLocalStorage = (clave) => {
  try {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.error('Error al cargar de localStorage:', error);
    return null;
  }
};

// Función para limpiar localStorage
export const limpiarLocalStorage = (clave) => {
  try {
    if (clave) {
      localStorage.removeItem(clave);
    } else {
      localStorage.clear();
    }
    return true;
  } catch (error) {
    console.error('Error al limpiar localStorage:', error);
    return false;
  }
}; 