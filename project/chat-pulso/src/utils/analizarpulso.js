// Constantes para rangos de frecuencia cardíaca según edad
const RANGOS_EDAD = {
  recienNacido: { min: 70, max: 190, nombre: 'Recién nacido (0-1 mes)' },
  bebe: { min: 80, max: 160, nombre: 'Bebé (1-11 meses)' },
  nino: { min: 80, max: 120, nombre: 'Niño (1-2 años)' },
  preescolar: { min: 80, max: 120, nombre: 'Preescolar (3-5 años)' },
  escolar: { min: 70, max: 110, nombre: 'Escolar (6-9 años)' },
  preadolescente: { min: 70, max: 110, nombre: 'Preadolescente (10-11 años)' },
  adolescente: { min: 60, max: 100, nombre: 'Adolescente (12-15 años)' },
  adulto: { min: 60, max: 100, nombre: 'Adulto (16+ años)' }
};

// Estados de frecuencia cardíaca
const ESTADOS = {
  BRADICARDIA_SEVERA: { nombre: 'Bradicardia Severa', color: 'red', prioridad: 1 },
  BRADICARDIA: { nombre: 'Bradicardia', color: 'orange', prioridad: 2 },
  NORMAL: { nombre: 'Normal', color: 'green', prioridad: 3 },
  TAQUICARDIA: { nombre: 'Taquicardia', color: 'orange', prioridad: 2 },
  TAQUICARDIA_SEVERA: { nombre: 'Taquicardia Severa', color: 'red', prioridad: 1 }
};

// Función para determinar el rango de edad basado en el contexto
function determinarRangoEdad(texto) {
  const textoLower = texto.toLowerCase();
  
  if (textoLower.includes('bebé') || textoLower.includes('bebe') || textoLower.includes('bebé') || textoLower.includes('recién nacido')) {
    return RANGOS_EDAD.recienNacido;
  }
  if (textoLower.includes('niño') || textoLower.includes('nino') || textoLower.includes('pequeño') || textoLower.includes('pequeno')) {
    return RANGOS_EDAD.nino;
  }
  if (textoLower.includes('adolescente') || textoLower.includes('joven')) {
    return RANGOS_EDAD.adolescente;
  }
  
  // Por defecto, asumir adulto
  return RANGOS_EDAD.adulto;
}

// Función para determinar el estado de la frecuencia cardíaca
function determinarEstado(pulso, rangoEdad) {
  const { min, max } = rangoEdad;
  
  if (pulso < min * 0.7) {
    return ESTADOS.BRADICARDIA_SEVERA;
  } else if (pulso < min) {
    return ESTADOS.BRADICARDIA;
  } else if (pulso <= max) {
    return ESTADOS.NORMAL;
  } else if (pulso <= max * 1.3) {
    return ESTADOS.TAQUICARDIA;
  } else {
    return ESTADOS.TAQUICARDIA_SEVERA;
  }
}

// Función para generar recomendaciones personalizadas
function generarRecomendaciones(estado, pulso, rangoEdad, contexto = '') {
  const recomendaciones = [];
  const contextoLower = contexto.toLowerCase();
  
  // Recomendaciones basadas en el estado
  switch (estado.nombre) {
    case 'Bradicardia Severa':
      recomendaciones.push(
        '🚨 Busca atención médica inmediata',
        '📞 Llama a emergencias si tienes síntomas',
        '🛌 Mantén reposo absoluto',
        '📱 Ten tu teléfono cerca'
      );
      break;
      
    case 'Bradicardia':
      recomendaciones.push(
        '⚠️ Consulta con tu médico',
        '🏃‍♂️ Evita ejercicio intenso',
        '☕ Considera reducir cafeína',
        '😴 Asegúrate de dormir bien'
      );
      break;
      
    case 'Normal':
      recomendaciones.push(
        '✅ Tu frecuencia cardíaca está en rango normal',
        '💪 Mantén un estilo de vida saludable',
        '🏃‍♂️ Continúa con ejercicio regular',
        '🥗 Sigue una dieta equilibrada'
      );
      break;
      
    case 'Taquicardia':
      recomendaciones.push(
        '⚠️ Relájate y respira profundamente',
        '💧 Bebe agua para hidratarte',
        '😌 Practica técnicas de relajación',
        '📞 Consulta médico si persiste'
      );
      break;
      
    case 'Taquicardia Severa':
      recomendaciones.push(
        '🚨 Busca atención médica urgente',
        '😮‍💨 Respira lenta y profundamente',
        '🛌 Siéntate o acuéstate',
        '📞 Llama emergencias si empeora'
      );
      break;
  }
  
  // Recomendaciones basadas en el contexto
  if (contextoLower.includes('ejercicio') || contextoLower.includes('deporte')) {
    recomendaciones.push('🏃‍♂️ Es normal que aumente durante el ejercicio');
  }
  
  if (contextoLower.includes('estrés') || contextoLower.includes('estres') || contextoLower.includes('nervioso')) {
    recomendaciones.push('🧘‍♀️ Practica meditación o yoga');
  }
  
  if (contextoLower.includes('dormir') || contextoLower.includes('sueño') || contextoLower.includes('sueno')) {
    recomendaciones.push('😴 La frecuencia cardíaca es más baja durante el sueño');
  }
  
  return recomendaciones;
}

// Función para generar mensaje personalizado
function generarMensaje(estado, pulso, rangoEdad, contexto = '') {
  const { nombre: nombreRango } = rangoEdad;
  const { min, max } = rangoEdad;
  
  let mensaje = `Tu frecuencia cardíaca es de **${pulso} BPM**.\n\n`;
  
  switch (estado.nombre) {
    case 'Bradicardia Severa':
      mensaje += `🚨 **${estado.nombre}**: Tu pulso está muy por debajo del rango normal para ${nombreRango} (${min}-${max} BPM).\n\nEsto puede indicar un problema cardíaco serio que requiere atención médica inmediata.`;
      break;
      
    case 'Bradicardia':
      mensaje += `⚠️ **${estado.nombre}**: Tu pulso está ligeramente por debajo del rango normal para ${nombreRango} (${min}-${max} BPM).\n\nEsto puede ser normal en atletas o durante el sueño, pero consulta con tu médico si tienes síntomas.`;
      break;
      
    case 'Normal':
      mensaje += `✅ **${estado.nombre}**: Tu pulso está perfectamente dentro del rango normal para ${nombreRango} (${min}-${max} BPM).\n\n¡Excelente! Tu corazón está funcionando correctamente.`;
      break;
      
    case 'Taquicardia':
      mensaje += `⚠️ **${estado.nombre}**: Tu pulso está por encima del rango normal para ${nombreRango} (${min}-${max} BPM).\n\nEsto puede deberse a ejercicio, estrés o cafeína, pero si persiste, consulta con tu médico.`;
      break;
      
    case 'Taquicardia Severa':
      mensaje += `🚨 **${estado.nombre}**: Tu pulso está muy por encima del rango normal para ${nombreRango} (${min}-${max} BPM).\n\nEsto puede indicar un problema cardíaco que requiere atención médica urgente.`;
      break;
  }
  
  return mensaje;
}

// Función principal mejorada
export function analizarPulso(texto) {
  try {
    // Extraer números del texto
    const numeros = texto.match(/\d+/g);
    if (!numeros || numeros.length === 0) {
      throw new Error('No se encontraron números válidos');
    }
    
    // Tomar el primer número como frecuencia cardíaca
    const pulso = parseInt(numeros[0]);
    
    // Validar rango razonable
    if (pulso < 30 || pulso > 250) {
      throw new Error('Frecuencia cardíaca fuera de rango razonable (30-250 BPM)');
    }
    
    // Determinar rango de edad basado en el contexto
    const rangoEdad = determinarRangoEdad(texto);
    
    // Determinar estado
    const estado = determinarEstado(pulso, rangoEdad);
    
    // Generar mensaje y recomendaciones
    const mensaje = generarMensaje(estado, pulso, rangoEdad, texto);
    const recomendaciones = generarRecomendaciones(estado, pulso, rangoEdad, texto);
    
    return {
      estado: estado.nombre,
      color: estado.color,
      mensaje: mensaje,
      consejos: recomendaciones,
      valor: pulso,
      rangoEdad: rangoEdad.nombre,
      rangoNormal: `${rangoEdad.min}-${rangoEdad.max} BPM`,
      prioridad: estado.prioridad,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      estado: 'Error',
      color: 'gray',
      mensaje: `❌ Error en el análisis: ${error.message}\n\nPor favor, escribe tu frecuencia cardíaca en números (ej: "75" o "Mi pulso es 80").`,
      consejos: [
        'Asegúrate de incluir solo números',
        'Ejemplo: "75" o "Mi frecuencia es 80"',
        'El rango debe estar entre 30-250 BPM'
      ],
      valor: null,
      error: true
    };
  }
}

// Función para obtener estadísticas del historial
export function obtenerEstadisticas(historial) {
  if (!historial || historial.length === 0) {
    return null;
  }
  
  const valores = historial
    .filter(item => item.valor && !item.error)
    .map(item => item.valor);
  
  if (valores.length === 0) {
    return null;
  }
  
  const promedio = Math.round(valores.reduce((a, b) => a + b, 0) / valores.length);
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  
  const estados = historial
    .filter(item => item.estado && !item.error)
    .map(item => item.estado);
  
  const estadoMasComun = estados.reduce((acc, estado) => {
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});
  
  const estadoFrecuente = Object.keys(estadoMasComun).reduce((a, b) => 
    estadoMasComun[a] > estadoMasComun[b] ? a : b
  );
  
  return {
    promedio,
    min,
    max,
    totalRegistros: valores.length,
    estadoMasComun: estadoFrecuente,
    tendencia: promedio > 80 ? 'Elevada' : promedio < 60 ? 'Baja' : 'Normal'
  };
}

// Función para validar entrada
export function validarEntrada(texto) {
  const numeros = texto.match(/\d+/g);
  
  if (!numeros || numeros.length === 0) {
    return {
      valido: false,
      error: 'No se encontraron números en el texto'
    };
  }
  
  const pulso = parseInt(numeros[0]);
  
  if (pulso < 30 || pulso > 250) {
    return {
      valido: false,
      error: 'La frecuencia cardíaca debe estar entre 30 y 250 BPM'
    };
  }
  
  return {
    valido: true,
    valor: pulso
  };
}

