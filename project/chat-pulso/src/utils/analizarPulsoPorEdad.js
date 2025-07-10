export function analizarPulsoPorEdad(pulso, edad) {
  const p = parseInt(pulso);
  const e = parseInt(edad);

  let etapa = '';
  let rango = {};

  if (e <= 12) {
    etapa = 'Niño';
    rango = { min: 70, max: 110 };
  } else if (e <= 17) {
    etapa = 'Adolescente';
    rango = { min: 60, max: 100 };
  } else if (e <= 59) {
    etapa = 'Adulto';
    rango = { min: 60, max: 100 };
  } else {
    etapa = 'Adulto Mayor';
    rango = { min: 60, max: 100 };
  }

  let estado, color, mensaje, consejos;

  if (p < rango.min) {
    estado = 'MALO';
    color = 'red';
    mensaje = `Tu pulso es bajo para un ${etapa.toLowerCase()}.`;
    consejos = ['Consulta con un médico', 'Descansa', 'Evita esfuerzos'];
  } else if (p <= rango.max) {
    estado = 'BIEN';
    color = 'green';
    mensaje = `Tu pulso es normal para un ${etapa.toLowerCase()}.`;
    consejos = ['Sigue cuidándote', 'Haz actividad física moderada', 'Come saludable'];
  } else if (p <= rango.max + 30) {
    estado = 'REGULAR';
    color = 'orange';
    mensaje = `Tu pulso está algo elevado para un ${etapa.toLowerCase()}.`;
    consejos = ['Relájate', 'Respira hondo', 'Evita cafeína y estrés'];
  } else {
    estado = 'MALO';
    color = 'red';
    mensaje = `Tu pulso es demasiado alto para un ${etapa.toLowerCase()}.`;
    consejos = ['Busca atención médica', 'Reposa', 'Controla tu respiración'];
  }

  return { etapa, estado, color, mensaje, consejos };
}
