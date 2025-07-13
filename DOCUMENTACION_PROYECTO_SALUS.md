# 📋 DOCUMENTACIÓN COMPLETA DEL PROYECTO SALUS MONITOR WEB

## 🎯 DESCRIPCIÓN GENERAL DEL PROYECTO

**SALUS Monitor Web** es un sistema de monitoreo de signos vitales en tiempo real que integra:
- **Hardware ESP32** para captura de datos biomédicos
- **Backend Node.js** con arquitectura hexagonal
- **Frontend React** con interfaz moderna
- **Chatbot inteligente** para análisis de signos vitales
- **Base de datos SQLite** con Prisma ORM

### 🏗️ Arquitectura del Sistema
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ESP32 Device  │───▶│  Backend API    │───▶│  Frontend React │
│   (Hardware)    │    │   (Node.js)     │    │   (UI/UX)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  Database       │    │   Chatbot       │
                       │  (SQLite)       │    │   (AI Analysis) │
                       └─────────────────┘    └─────────────────┘
```

---

## 👥 DISTRIBUCIÓN DE RESPONSABILIDADES POR ESTUDIANTE

### 🎓 ESTUDIANTE 1: BACKEND & API DEVELOPMENT
**Responsabilidades principales:**
- Desarrollo del servidor Node.js
- Implementación de WebSocket para ESP32
- Gestión de base de datos con Prisma
- APIs REST para pacientes y signos vitales

#### 📁 Archivos a cargo:
```
BACKEND/
├── src/
│   ├── server.js                          # Servidor principal
│   ├── infrastructure/
│   │   ├── ws/VitalSignsWebSocket.js      # WebSocket ESP32
│   │   ├── web/
│   │   │   ├── controllers/               # Controladores API
│   │   │   └── routes/                    # Rutas REST
│   │   └── db/                           # Repositorios DB
│   ├── core/
│   │   ├── entities/                      # Entidades de dominio
│   │   ├── repositories/                  # Interfaces repositorio
│   │   └── usecases/                      # Casos de uso
│   └── application/services/              # Servicios aplicación
├── prisma/
│   └── schema.prisma                      # Esquema de base de datos
└── package.json
```

#### 🔧 Tecnologías que maneja:
- **Node.js** + **Express.js**
- **WebSocket** (ws library)
- **Prisma ORM** + **SQLite**
- **Arquitectura Hexagonal**
- **JWT** (para autenticación futura)

#### 📋 Tareas específicas:
1. **Configuración del servidor** (`server.js`)
   - Middleware CORS
   - Configuración de rutas
   - Integración WebSocket

2. **WebSocket para ESP32** (`VitalSignsWebSocket.js`)
   - Manejo de conexiones de dispositivos
   - Procesamiento de datos de sensores
   - Validación de datos entrantes

3. **APIs REST** (carpeta `routes/`)
   - `/api/clientes` - Gestión de pacientes
   - `/api/vitals` - Signos vitales
   - `/api/sessions` - Sesiones de monitoreo
   - `/api/devices` - Dispositivos ESP32

4. **Base de datos** (`schema.prisma`)
   - Modelos: Pacient, SignosVitales, Session, Device
   - Relaciones entre entidades
   - Migraciones de base de datos

5. **Casos de uso** (carpeta `usecases/`)
   - Registro de pacientes
   - Procesamiento de signos vitales
   - Gestión de sesiones

---

### 🎓 ESTUDIANTE 2: FRONTEND - INTERFAZ DE USUARIO
**Responsabilidades principales:**
- Desarrollo de componentes React
- Implementación de páginas principales
- Gestión de estado con Context API
- Diseño responsive con Tailwind CSS

#### 📁 Archivos a cargo:
```
FRONTEND/appwebs/src/
├── App.jsx                                # Componente principal
├── main.jsx                              # Punto de entrada
├── presentacion/
│   ├── componentes/
│   │   ├── pages/
│   │   │   ├── RegisterPage.jsx          # Página de registro
│   │   │   ├── MonitorPage.jsx           # Página de monitoreo
│   │   │   └── vitalmonitor/
│   │   │       ├── ControlPanel.jsx      # Panel de control
│   │   │       ├── SessionInfo.jsx       # Info de sesión
│   │   │       └── RealTimeChart.jsx     # Gráfico tiempo real
│   │   └── common/
│   │       ├── VitalSignCard.jsx         # Tarjeta de signos vitales
│   │       └── ParticleBackground.jsx    # Fondo animado
│   └── contexts/
│       └── VitalMonitorContext.jsx       # Context API
├── infrastructure/
│   └── api/
│       ├── apiClient.js                  # Cliente HTTP
│       ├── config.js                     # Configuración API
│       ├── patientsApi.js                # APIs de pacientes
│       ├── vitalsApi.js                  # APIs de signos vitales
│       └── wsClient.js                   # Cliente WebSocket
└── index.css                             # Estilos globales
```

#### 🔧 Tecnologías que maneja:
- **React 19** + **React Router DOM**
- **Tailwind CSS** + **PostCSS**
- **Framer Motion** (animaciones)
- **Context API** (gestión de estado)
- **Axios** (cliente HTTP)

#### 📋 Tareas específicas:
1. **Página de Registro** (`RegisterPage.jsx`)
   - Formulario de registro de pacientes
   - Validación de datos
   - Integración con API backend

2. **Página de Monitoreo** (`MonitorPage.jsx`)
   - Interfaz principal de monitoreo
   - Integración con VitalMonitor
   - Manejo de estados de conexión

3. **Componentes de Monitoreo** (carpeta `vitalmonitor/`)
   - `ControlPanel.jsx` - Botones de control
   - `SessionInfo.jsx` - Información de sesión
   - `RealTimeChart.jsx` - Gráficos en tiempo real

4. **Componentes Comunes** (carpeta `common/`)
   - `VitalSignCard.jsx` - Tarjetas de signos vitales
   - `ParticleBackground.jsx` - Efectos visuales

5. **Gestión de Estado** (`VitalMonitorContext.jsx`)
   - Context API para estado global
   - Reducer para acciones complejas
   - Hooks personalizados

6. **Cliente API** (carpeta `api/`)
   - Configuración de endpoints
   - Manejo de errores HTTP
   - Integración WebSocket

---

### 🎓 ESTUDIANTE 3: FRONTEND - MONITOREO EN TIEMPO REAL
**Responsabilidades principales:**
- Componente principal de monitoreo
- Integración WebSocket en tiempo real
- Visualización de datos biomédicos
- Hooks personalizados para datos

#### 📁 Archivos a cargo:
```
FRONTEND/appwebs/src/
├── presentacion/componentes/common/
│   └── vitalmonitor.jsx                   # Componente principal
├── presentacion/componentes/pages/vitalmonitor/
│   └── hooks/
│       └── useVitalData.js               # Hook de datos vitales
├── domain/
│   ├── entities/
│   │   └── Paciente.js                   # Entidad paciente
│   └── use-cases/
│       ├── RegistroPaciente.js           # Caso de uso registro
│       └── VitalMonitoring.js            # Caso de uso monitoreo
└── infrastructure/api/
    └── wsClient.js                       # Cliente WebSocket
```

#### 🔧 Tecnologías que maneja:
- **React Hooks** (useState, useEffect, useCallback)
- **WebSocket** (conexión en tiempo real)
- **Framer Motion** (animaciones avanzadas)
- **Custom Hooks** (lógica reutilizable)
- **Domain-Driven Design** (entidades y casos de uso)

#### 📋 Tareas específicas:
1. **Componente VitalMonitor** (`vitalmonitor.jsx`)
   - Interfaz principal de monitoreo
   - Visualización de BPM en tiempo real
   - Estado de conexión ESP32
   - Información de sesión

2. **Hook useVitalData** (`useVitalData.js`)
   - Gestión de datos de signos vitales
   - Control de sesiones de monitoreo
   - Manejo de conexión WebSocket
   - Estados de error y carga

3. **Entidades de Dominio** (carpeta `domain/`)
   - `Paciente.js` - Modelo de paciente
   - `RegistroPaciente.js` - Lógica de registro
   - `VitalMonitoring.js` - Lógica de monitoreo

4. **Cliente WebSocket** (`wsClient.js`)
   - Conexión con servidor WebSocket
   - Manejo de eventos en tiempo real
   - Reconexión automática
   - Gestión de errores

5. **Visualización de Datos**
   - Tarjetas de signos vitales
   - Indicadores de estado
   - Animaciones de pulso
   - Efectos visuales

---

### 🎓 ESTUDIANTE 4: CHATBOT & ANÁLISIS INTELIGENTE
**Responsabilidades principales:**
- Desarrollo del chatbot médico
- Análisis inteligente de signos vitales
- Interfaz de chat integrada
- Lógica de recomendaciones médicas

#### 📁 Archivos a cargo:
```
FRONTEND/appwebs/src/presentacion/componentes/common/
└── vitalmonitor.jsx                       # (Sección del chatbot)

# Funciones específicas del chatbot:
- analizarPulso()                          # Análisis de frecuencia cardíaca
- ChatBotPanel()                           # Panel principal del chat
- ChatMessage()                            # Componente de mensajes
- InputArea()                              # Área de entrada
- EstadoCard()                             # Tarjeta de estado
```

#### 🔧 Tecnologías que maneja:
- **React State Management**
- **JavaScript ES6+**
- **CSS-in-JS** (estilos inline)
- **Lógica de análisis médico**
- **UX/UI para chatbots**

#### 📋 Tareas específicas:
1. **Función analizarPulso()**
   - Análisis de frecuencia cardíaca
   - Clasificación de estados (BIEN, REGULAR, MALO)
   - Generación de recomendaciones médicas
   - Asignación de colores y iconos

2. **Componente ChatBotPanel()**
   - Gestión del estado del chat
   - Manejo de mensajes del usuario
   - Procesamiento de respuestas del bot
   - Scroll automático del chat

3. **Componente ChatMessage()**
   - Renderizado de mensajes del bot
   - Renderizado de mensajes del usuario
   - Mensaje de bienvenida especial
   - Integración de imágenes del bot

4. **Componente InputArea()**
   - Campo de entrada de texto
   - Botón de envío
   - Validación de entrada
   - Ejemplos de uso

5. **Componente EstadoCard()**
   - Visualización del estado de salud
   - Lista de consejos médicos
   - Colores y iconos según estado
   - Diseño responsivo

6. **Lógica de Análisis Médico**
   - Rangos normales de frecuencia cardíaca
   - Clasificación de estados de salud
   - Generación de consejos personalizados
   - Alertas médicas

---

## 🔄 FLUJO DE DATOS DEL SISTEMA

### 1. Registro de Paciente
```
Usuario → RegisterPage → API /api/clientes → Database
```

### 2. Monitoreo en Tiempo Real
```
ESP32 → WebSocket → Backend → Database
Backend → WebSocket → Frontend → VitalMonitor
```

### 3. Análisis con Chatbot
```
Usuario → ChatBotPanel → analizarPulso() → EstadoCard
```

### 4. Guardado de Datos
```
Frontend → API /api/vitals → Database
```

---

## 🛠️ CONFIGURACIÓN Y DESARROLLO

### Requisitos del Sistema
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git** para control de versiones

### Instalación y Configuración

#### Backend (Estudiante 1)
```bash
cd BACKEND
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

#### Frontend (Estudiantes 2, 3, 4)
```bash
cd FRONTEND/appwebs
npm install
npm run dev
```

### Variables de Entorno
```env
# BACKEND/.env
DATABASE_URL="file:./dev.db"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

---

## 📊 MÉTRICAS DE DESEMPEÑO

### Backend
- **Tiempo de respuesta API**: < 200ms
- **Conexiones WebSocket simultáneas**: 100+
- **Uptime del servidor**: 99.9%

### Frontend
- **Tiempo de carga inicial**: < 3s
- **Latencia WebSocket**: < 100ms
- **Responsive design**: Mobile-first

### Chatbot
- **Tiempo de respuesta**: < 500ms
- **Precisión de análisis**: 95%+
- **Cobertura de casos médicos**: 90%+

---

## 🚀 DEPLOYMENT Y PRODUCCIÓN

### Backend (Estudiante 1)
- **Plataforma**: Heroku/Railway/DigitalOcean
- **Base de datos**: PostgreSQL (producción)
- **Variables de entorno**: Configuración de producción

### Frontend (Estudiantes 2, 3, 4)
- **Plataforma**: Vercel/Netlify
- **Build**: `npm run build`
- **CDN**: Optimización de assets

---

## 🔍 TESTING Y CALIDAD

### Backend Testing
- **Unit tests**: Jest
- **Integration tests**: Supertest
- **WebSocket tests**: ws library

### Frontend Testing
- **Component tests**: React Testing Library
- **E2E tests**: Cypress
- **Visual regression**: Percy

### Chatbot Testing
- **Logic tests**: Jest
- **User experience**: Manual testing
- **Medical accuracy**: Expert review

---

## 📚 RECURSOS Y DOCUMENTACIÓN

### Documentación Técnica
- **API Documentation**: Swagger/OpenAPI
- **Database Schema**: Prisma Studio
- **Component Library**: Storybook

### Herramientas de Desarrollo
- **Code Editor**: VS Code
- **Version Control**: Git + GitHub
- **Package Manager**: npm
- **Build Tool**: Vite

### Bibliotecas Principales
- **Backend**: Express, Prisma, ws
- **Frontend**: React, Tailwind, Framer Motion
- **Testing**: Jest, React Testing Library

---

## 🎯 OBJETIVOS DE APRENDIZAJE POR ESTUDIANTE

### Estudiante 1 (Backend)
- Arquitectura hexagonal
- WebSocket en tiempo real
- ORM con Prisma
- APIs RESTful
- Manejo de errores

### Estudiante 2 (Frontend UI)
- React moderno (19)
- Tailwind CSS avanzado
- Context API
- Componentes reutilizables
- Responsive design

### Estudiante 3 (Frontend Real-time)
- WebSocket en React
- Custom hooks
- Domain-driven design
- Gestión de estado complejo
- Optimización de rendimiento

### Estudiante 4 (Chatbot)
- Lógica de análisis médico
- UX/UI para chatbots
- JavaScript avanzado
- Integración de componentes
- Experiencia de usuario

---

## 📞 COMUNICACIÓN Y COLABORACIÓN

### Git Workflow
```bash
# Cada estudiante trabaja en su rama
git checkout -b rama-[nombre-estudiante]

# Comandos diarios
git pull origin main          # Actualizar desde main
git add .                     # Agregar cambios
git commit -m "descripción"   # Commit cambios
git push origin mi-rama       # Subir a rama personal
```

### Reuniones de Sincronización
- **Daily Standup**: 15 min diarios
- **Code Review**: Antes de merge a main
- **Sprint Planning**: Semanal
- **Demo**: Al final de cada sprint

### Herramientas de Colaboración
- **GitHub**: Control de versiones
- **Discord/Slack**: Comunicación
- **Figma**: Diseño de UI/UX
- **Notion**: Documentación

---

## 🏆 CRITERIOS DE EVALUACIÓN

### Código (40%)
- Funcionalidad completa
- Código limpio y documentado
- Manejo de errores
- Testing implementado

### Colaboración (30%)
- Comunicación efectiva
- Resolución de conflictos
- Ayuda a compañeros
- Participación en reuniones

### Innovación (20%)
- Mejoras técnicas
- Optimizaciones
- Nuevas funcionalidades
- Experiencia de usuario

### Presentación (10%)
- Demo funcional
- Documentación clara
- Explicación técnica
- Respuestas a preguntas

---

## 🎉 CONCLUSIÓN

Este proyecto integra múltiples tecnologías modernas y proporciona una experiencia de aprendizaje completa en desarrollo full-stack. Cada estudiante tiene responsabilidades específicas pero complementarias, fomentando la colaboración y el trabajo en equipo.

**¡Éxito en el desarrollo del proyecto SALUS Monitor Web!** 🚀 