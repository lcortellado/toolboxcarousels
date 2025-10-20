# Toolbox Carousels - React Native App

Una aplicación React Native moderna con tema dark que consume una API REST para mostrar carruseles dinámicos con funcionalidad de reproducción de video.

## 🎨 Características del Diseño

- **Tema Dark Moderno**: Diseño elegante con colores oscuros y acentos en indigo
- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **UI/UX Optimizada**: Interfaz intuitiva y fácil de usar

## 🚀 Características Técnicas

- **Autenticación automática**: Login automático con renovación de token
- **Carruseles dinámicos**: Soporte para tipos "thumb" y "poster"
- **Reproductor de video**: Reproducción de videos con controles nativos
- **Lazy loading**: Carga optimizada de imágenes
- **Redux**: Manejo de estado global con Redux Toolkit
- **Tests unitarios**: Tests con Jest y React Native Testing Library
- **Pull-to-refresh**: Actualización manual de contenido
- **Manejo de errores**: Gestión robusta de errores de red

## 📋 Requisitos Previos

- Node.js >= 18
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS - solo macOS)
- Java Development Kit (JDK) 11 o superior

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd ToolboxCarousels
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Instalación específica por plataforma

#### Para iOS (solo macOS):
```bash
cd ios && pod install && cd ..
```

#### Para Android:
Asegúrate de tener Android Studio instalado y configurado correctamente.

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
# Iniciar Metro bundler
npm start
# o
yarn start

# En otra terminal, ejecutar en Android
npm run android
# o
yarn android

# En otra terminal, ejecutar en iOS (solo macOS)
npm run ios
# o
yarn ios
```

### Tests
```bash
npm test
# o
yarn test
```

### Linting
```bash
npm run lint
# o
yarn lint
```

## 📱 Funcionalidades

### API Integration
- **Login automático**: Se autentica automáticamente con el API
- **Renovación de token**: Maneja la expiración de tokens automáticamente
- **Endpoints**:
  - `POST /v1/mobile/auth` - Autenticación
  - `GET /v1/mobile/data` - Datos de carruseles

### Carruseles
- **Tipos soportados**:
  - `thumb`: Carrusel horizontal con imágenes pequeñas
  - `poster`: Carrusel horizontal con imágenes grandes
- **Contenido dinámico**: Se adapta automáticamente a cualquier cantidad de carruseles e ítems
- **Lazy loading**: Las imágenes se cargan de forma optimizada

### Reproductor de Video
- **Reproducción nativa**: Usa react-native-video para reproducción optimizada
- **Controles integrados**: Play, pause, seek, fullscreen
- **Manejo de errores**: Mensajes informativos cuando no hay video disponible
- **Modal fullscreen**: Experiencia de visualización inmersiva

### Estado Global (Redux)
- **Redux Toolkit**: Implementación moderna de Redux
- **Async Thunks**: Manejo de operaciones asíncronas
- **Selectores**: Acceso optimizado al estado
- **Acciones**:
  - `login()` - Autenticación
  - `fetchCarouselData()` - Obtener datos
  - `showVideoPlayer()` - Mostrar reproductor
  - `hideVideoPlayer()` - Ocultar reproductor

## 🧪 Testing

### Tests Unitarios
Los tests cubren:
- Componente `Carousel`
- Servicio `ApiService`
- Redux slice y acciones

### Ejecutar Tests
```bash
# Todos los tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con coverage
npm test -- --coverage
```

## 🏗️ Arquitectura

### Estructura de Carpetas
```
src/
├── components/
│   ├── Carousel.js          # Componente principal del carrusel
│   ├── CarouselItem.js      # Item individual del carrusel
│   └── VideoPlayer.js       # Reproductor de video
├── services/
│   └── api.js               # Servicio de API
└── store/
    ├── index.js             # Configuración del store
    └── carouselSlice.js     # Redux slice
```

### Principios SOLID Aplicados
- **Single Responsibility**: Cada componente tiene una responsabilidad específica
- **Open/Closed**: Componentes extensibles sin modificación
- **Liskov Substitution**: Interfaces consistentes entre componentes
- **Interface Segregation**: APIs específicas y enfocadas
- **Dependency Inversion**: Dependencias inyectadas via Redux

### Patrones de Diseño
- **Singleton**: ApiService como instancia única
- **Observer**: Redux para comunicación entre componentes
- **Factory**: Creación dinámica de componentes de carrusel
- **Strategy**: Diferentes tipos de carrusel (thumb/poster)

## 🔧 Configuración

### Variables de Entorno
La aplicación usa URLs hardcodeadas para el API. Para cambiar el endpoint:

```javascript
// src/services/api.js
const API_BASE_URL = 'https://your-api-url.com';
```

### Personalización de Estilos
Los estilos están definidos en cada componente usando `StyleSheet.create()`. Puedes modificar:
- Colores en `styles`
- Dimensiones de carruseles
- Espaciado y márgenes

## 🐛 Troubleshooting

### Problemas Comunes

#### Android
```bash
# Limpiar cache
cd android && ./gradlew clean && cd ..

# Reinstalar dependencias
rm -rf node_modules && npm install
```

#### iOS
```bash
# Limpiar pods
cd ios && rm -rf Pods && pod install && cd ..

# Limpiar build
cd ios && xcodebuild clean && cd ..
```

#### Metro Bundler
```bash
# Limpiar cache de Metro
npx react-native start --reset-cache
```

### Errores de Dependencias
Si encuentras errores con `react-native-video` o `react-native-fast-image`:

1. **Android**: Asegúrate de tener las dependencias nativas instaladas
2. **iOS**: Ejecuta `pod install` después de instalar nuevas dependencias

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, contacta al equipo de desarrollo.