# 💓 Salus Monitor - Chat de Pulso Inteligente

## 🏥 Rangos de Frecuencia Cardíaca por Edad

| Grupo de Edad | Rango Normal (BPM) | Descripción |
|---------------|-------------------|-------------|
| Recién nacido | 70-190 | 0-1 mes |
| Bebé | 80-160 | 1-11 meses |
| Niño | 80-120 | 1-2 años |
| Preescolar | 80-120 | 3-5 años |
| Escolar | 70-110 | 6-9 años |
| Preadolescente | 70-110 | 10-11 años |
| Adolescente | 60-100 | 12-15 años |
| Adulto | 60-100 | 16+ años |



## 🔧 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── App.js                    # Componente principal
├── index.css                 # Estilos globales y animaciones
├── hooks/
│   └── useChatLogic.js       # Hook personalizado para lógica del chat
├── Componentes/
│   ├── ChatMessage.js        # Mensajes del chat
│   ├── EstadoCard.js         # Tarjetas de estado de salud
│   ├── InputArea.js          # Área de entrada con sugerencias
│   ├── VitalSignIndicator.js # Indicadores visuales
│   └── EstadisticasCard.js   # Panel de estadísticas
└── utils/
    ├── analizarpulso.js      # Lógica de análisis inteligente
    └── chatUtils.js          # Utilidades adicionales
