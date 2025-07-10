export function analizarPulso(pulso) {
  const numero = parseInt(pulso);

  if (numero < 60) {
    return {
      estado: 'MALO',
      color: 'red',
      mensaje: 'Tu pulso está muy bajo. Deberías ir al doctor.',
      consejos: ['Ve al doctor', 'No hagas ejercicio', 'Descansa']
    };
  } else if (numero <= 100) {
    return {
      estado: 'BIEN',
      color: 'green',
      mensaje: 'Tu pulso está normal. Estás bien!',
      consejos: ['Sigue así', 'Haz ejercicio', 'Come saludable']
    };
  } else if (numero <= 150) {
    return {
      estado: 'REGULAR',
      color: 'orange',
      mensaje: 'Tu pulso está un poco alto. Ten cuidado.',
      consejos: ['Relájate', 'Respira profundo', 'Toma agua']
    };
  } else {
    return {
      estado: 'MALO',
      color: 'red',
      mensaje: 'Tu pulso está muy alto! Ve al doctor YA!',
      consejos: ['Llama al doctor', 'Siéntate', 'No te muevas mucho']
    };
  }
}
