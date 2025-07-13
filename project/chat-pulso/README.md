# 💓 Salus Monitor - Chat de Pulso Inteligente

Una aplicación web moderna y avanzada para analizar la frecuencia cardíaca en tiempo real. Diseñada con inteligencia artificial para proporcionar análisis precisos y recomendaciones personalizadas basadas en la edad, contexto y patrones de salud.

## ✨ Características Avanzadas

### 🧠 Lógica Inteligente
- **Análisis por rangos de edad** (recién nacido, bebé, niño, adolescente, adulto)
- **Detección de contexto** (ejercicio, estrés, sueño, etc.)
- **Recomendaciones personalizadas** basadas en el estado y contexto
- **Validación robusta** de entrada con manejo de errores
- **Sistema de prioridades** para diferentes estados de salud

### 📊 Sistema de Estadísticas
- **Análisis en tiempo real** de tendencias
- **Historial completo** de mediciones
- **Estadísticas detalladas** (promedio, mínimo, máximo, tendencia)
- **Exportación de datos** en múltiples formatos (JSON, CSV, TXT)
- **Persistencia local** con localStorage

### 🎨 Diseño Moderno
- **Interfaz elegante** con glassmorphism y efectos visuales
- **Tipografía Inter** optimizada para legibilidad
- **Paleta de colores profesional** para aplicaciones de salud
- **Animaciones suaves** y micro-interacciones
- **Diseño responsive** para todos los dispositivos

### 💬 Funcionalidades del Chat
- **Análisis inteligente** con rangos específicos por edad
- **Indicadores visuales** con códigos de color y prioridades
- **Sugerencias contextuales** en tiempo real
- **Animación de escritura** para simular respuesta del bot
- **Auto-scroll inteligente** a nuevos mensajes
- **Sistema de configuración** personalizable

## 🚀 Tecnologías Utilizadas

- **React 18** - Framework de interfaz de usuario
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript ES6+** - Lógica avanzada de aplicación
- **Google Fonts (Inter)** - Tipografía moderna
- **LocalStorage API** - Persistencia de datos
- **Custom Hooks** - Lógica reutilizable y organizada

## 📱 Características de UX Avanzadas

### Interfaz de Usuario
- **Glassmorphism** con efectos de blur y transparencia
- **Micro-interacciones** en botones y elementos
- **Estados visuales** claros para diferentes acciones
- **Feedback inmediato** para todas las interacciones
- **Sugerencias contextuales** inteligentes

### Accesibilidad
- **Contraste adecuado** para mejor legibilidad
- **Estados deshabilitados** claros
- **Navegación por teclado** (Enter para enviar)
- **Indicadores visuales** para diferentes tipos de mensaje
- **Manejo de errores** con notificaciones claras

## 🎯 Cómo Usar

### Entrada Básica
1. **Escribe tu frecuencia cardíaca** en el campo de entrada
   - Solo números: "75"
   - Con contexto: "Mi pulso es 80 después del ejercicio"
   - Especificar edad: "Mi bebé tiene 120 pulsaciones"

### Funciones Avanzadas
2. **Configuración personalizada**:
   - Ajusta el tiempo de respuesta del bot
   - Activa/desactiva el guardado de historial
   - Controla la visualización de estadísticas

3. **Análisis de estadísticas**:
   - Visualiza tendencias de tu frecuencia cardíaca
   - Exporta datos en diferentes formatos
   - Revisa el historial completo de mediciones

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

## 🎨 Paleta de Colores

### Primarios
- **Azul-Púrpura**: `#667eea` → `#764ba2`
- **Verde Salud**: `#10b981` → `#059669`
- **Amarillo Atención**: `#f59e0b` → `#d97706`
- **Rojo Crítico**: `#ef4444` → `#dc2626`

### Neutros
- **Gris Claro**: `#f8fafc` → `#f1f5f9`
- **Gris Medio**: `#6b7280`
- **Gris Oscuro**: `#374151`

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
```

## 🎭 Animaciones Implementadas

- **fadeInUp**: Entrada suave de la aplicación
- **slideIn/slideOut**: Mensajes que aparecen desde diferentes lados
- **pulse**: Indicadores de estado que pulsan
- **Hover effects**: Interacciones en botones y elementos
- **Typing animation**: Simulación de escritura del bot

## 🌟 Mejoras de Lógica Implementadas

### Análisis Inteligente
- ✅ Rangos específicos por edad y grupo poblacional
- ✅ Detección automática de contexto (ejercicio, estrés, sueño)
- ✅ Sistema de prioridades para estados de salud
- ✅ Validación robusta con manejo de errores
- ✅ Recomendaciones personalizadas basadas en múltiples factores

### Gestión de Estado
- ✅ Hook personalizado `useChatLogic` para lógica centralizada
- ✅ Manejo asíncrono de respuestas con timeouts configurables
- ✅ Sistema de historial con persistencia local
- ✅ Estadísticas en tiempo real con cálculos automáticos
- ✅ Gestión de errores con notificaciones temporales

### Funcionalidades Avanzadas
- ✅ Exportación de datos en múltiples formatos (JSON, CSV, TXT)
- ✅ Sistema de configuración personalizable
- ✅ Sugerencias contextuales inteligentes
- ✅ Análisis de tendencias y patrones
- ✅ Persistencia de datos con localStorage

### Experiencia de Usuario
- ✅ Interfaz configurable con paneles desplegables
- ✅ Feedback visual inmediato para todas las acciones
- ✅ Auto-scroll inteligente y animaciones suaves
- ✅ Indicadores de estado claros y profesionales
- ✅ Manejo de errores con mensajes informativos

## 📊 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móviles
- ✅ Tablets y pantallas táctiles

## 🔍 Características Técnicas

### Performance
- **Lazy loading** de componentes
- **Memoización** de cálculos costosos
- **Debouncing** en entrada de texto
- **Optimización** de re-renders

### Seguridad
- **Validación** de entrada en cliente y servidor
- **Sanitización** de datos de entrada
- **Manejo seguro** de localStorage
- **Protección** contra XSS

### Escalabilidad
- **Arquitectura modular** con componentes reutilizables
- **Hooks personalizados** para lógica compartida
- **Utilidades separadas** para funcionalidades específicas
- **Configuración centralizada** para fácil mantenimiento

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Mantener el estilo de código consistente
2. Probar en diferentes navegadores
3. Seguir las mejores prácticas de UX/UI
4. Documentar cambios significativos
5. Agregar tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para mejorar la experiencia de monitoreo de salud cardíaca**

### 🏆 Características Destacadas

- **Análisis médico preciso** basado en estándares internacionales
- **Interfaz profesional** diseñada para aplicaciones de salud
- **Lógica inteligente** que se adapta al contexto del usuario
- **Sistema completo** de seguimiento y análisis de datos
- **Experiencia de usuario** optimizada para uso médico