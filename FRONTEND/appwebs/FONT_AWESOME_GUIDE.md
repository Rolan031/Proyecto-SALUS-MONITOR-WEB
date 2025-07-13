# Guía de Font Awesome en el Proyecto SALUS

## 📋 Resumen

Este proyecto utiliza **Font Awesome 6.4.0** para mostrar iconos en los componentes de registro y monitoreo. Los iconos están configurados para funcionar específicamente en estos componentes sin afectar al resto de la aplicación.

## 🎯 Componentes que usan Font Awesome

- **RegisterPage.jsx** - Formulario de registro de pacientes
- **MonitorPage.jsx** - Página de monitoreo de signos vitales
- **VitalMonitor.jsx** - Componente de monitoreo en tiempo real

## 🔧 Configuración

### 1. Importación de Font Awesome

Los iconos se importan en el archivo CSS modular:
```css
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
```

### 2. Estilos específicos para iconos

En `RegistroMonitorStyles.module.css`:
```css
/* Estilos específicos para iconos de Font Awesome en estos componentes */
.customStyles .fas,
.customStyles .far,
.customStyles .fab {
  font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Pro', 'Font Awesome 6 Brands', sans-serif;
  font-weight: 900;
}
```

## 📚 Cómo usar los iconos

### Iconos básicos
```jsx
// Usuario
<i className="fas fa-user"></i>

// Usuario agregando
<i className="fas fa-user-plus"></i>

// Usuario eliminado
<i className="fas fa-user-slash"></i>

// Cumpleaños
<i className="fas fa-birthday-cake"></i>

// Género
<i className="fas fa-venus-mars"></i>

// Microchip/Dispositivo
<i className="fas fa-microchip"></i>

// Verificación
<i className="fas fa-user-check"></i>

// Spinner de carga
<i className="fas fa-spinner fa-spin"></i>

// Torre de transmisión
<i className="fas fa-broadcast-tower"></i>
```

### Iconos con animaciones
```jsx
// Spinner giratorio
<i className="fas fa-spinner fa-spin"></i>

// Pulso
<i className="fas fa-heartbeat fa-pulse"></i>

// Parpadeo
<i className="fas fa-bell fa-blink"></i>
```

### Iconos con tamaños
```jsx
// Tamaños disponibles: fa-xs, fa-sm, fa-lg, fa-2x, fa-3x, etc.
<i className="fas fa-user fa-2x"></i>
<i className="fas fa-heart fa-lg"></i>
```

## 🎨 Ejemplos prácticos

### 1. Botón con icono
```jsx
<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
  <i className="fas fa-save"></i>
  Guardar
</button>
```

### 2. Estado de carga
```jsx
{isLoading ? (
  <div className="flex items-center gap-2">
    <i className="fas fa-spinner fa-spin"></i>
    Procesando...
  </div>
) : (
  <div className="flex items-center gap-2">
    <i className="fas fa-check"></i>
    Completado
  </div>
)}
```

### 3. Indicadores de estado
```jsx
// Estado exitoso
<i className="fas fa-check-circle text-green-500"></i>

// Estado de advertencia
<i className="fas fa-exclamation-triangle text-yellow-500"></i>

// Estado de error
<i className="fas fa-times-circle text-red-500"></i>
```

## 🔍 Iconos más usados en el proyecto

### Registro de Pacientes
- `fa-user-plus` - Agregar usuario
- `fa-user` - Usuario
- `fa-birthday-cake` - Edad
- `fa-venus-mars` - Género
- `fa-microchip` - Dispositivo
- `fa-user-check` - Verificar usuario
- `fa-spinner` - Carga
- `fa-broadcast-tower` - Transmisión

### Monitoreo
- `fa-heartbeat` - Latidos
- `fa-lungs` - Respiración
- `fa-thermometer-half` - Temperatura
- `fa-tachometer-alt` - Presión
- `fa-chart-line` - Gráficos
- `fa-play` - Iniciar
- `fa-pause` - Pausar
- `fa-stop` - Detener

## ⚠️ Consideraciones importantes

1. **Encapsulación**: Los estilos de Font Awesome solo se aplican dentro de componentes con la clase `.customStyles`

2. **Rendimiento**: Los iconos se cargan desde CDN, asegúrate de tener conexión a internet

3. **Accesibilidad**: Los iconos deben tener texto alternativo para lectores de pantalla

4. **Compatibilidad**: Funciona en todos los navegadores modernos

## 🚀 Próximos pasos

Para agregar nuevos iconos:
1. Busca el icono en [Font Awesome](https://fontawesome.com/icons)
2. Copia la clase CSS (ej: `fas fa-heart`)
3. Úsala en tu componente JSX
4. Los estilos se aplicarán automáticamente

## 📖 Referencias

- [Font Awesome Documentation](https://fontawesome.com/docs)
- [Icon Search](https://fontawesome.com/search)
- [CDN Link](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css) 