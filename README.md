# 🧬 Pokemon Search App

> **Una aplicación web moderna y modular para buscar información detallada de Pokemon usando la PokeAPI**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2+-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Modular-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-181717?style=flat&logo=github&logoColor=white)](https://erizhi1.github.io/pokemon/)
[![PokeAPI](https://img.shields.io/badge/PokeAPI-v2-FF6B6B?style=flat&logo=pokemon&logoColor=white)](https://pokeapi.co/)

## 🌟 **Demo en Vivo**

🔗 **[Ver Aplicación](https://erizhi1.github.io/pokemon/)**

## 📸 **Capturas de Pantalla**

<div align="center">
  <img src="docs/screenshot-main.png" alt="Pantalla Principal" width="45%">
  <img src="docs/screenshot-modal.png" alt="Modal de Detalles" width="45%">
</div>

## ✨ **Características Principales**

### 🔍 **Búsqueda Inteligente**
- Búsqueda por **ID numérico** (1-1025) o **nombre** del Pokemon
- Validación en tiempo real con mensajes descriptivos
- Sugerencias automáticas en caso de errores

### 🎨 **Interfaz Moderna**
- Diseño responsivo y atractivo
- Animaciones suaves y transiciones fluidas
- Spinner de carga temático (Pokeball animada)
- Modal interactivo para información adicional

### 📊 **Información Completa**
- **Datos básicos**: Nombre, imagen, tipo, estadísticas
- **Movimientos**: Lista de los 10 primeros movimientos
- **Hábitat**: Información del entorno natural
- **Detalles adicionales**: Altura, peso, experiencia, habilidades

### ⚡ **Performance Optimizada**
- Arquitectura modular y reutilizable
- Código organizado en helpers especializados
- Estilos SCSS separados por componentes
- Build optimizado para producción

## 🏗️ **Arquitectura Técnica**

### 📁 **Estructura del Proyecto**

```
pokemon/
├── 📄 README.md
├── 📦 package.json
├── ⚙️ vue.config.js
├── 🎨 babel.config.js
│
├── 📂 public/
│   ├── 🖼️ favicon.ico
│   └── 📄 index.html
│
├── 📂 src/
│   ├── 🧩 App.vue                 # Componente principal (refactorizado)
│   ├── 🚀 main.js                 # Punto de entrada
│   ├── 🎨 pokemon_type.scss       # Variables de tipos de Pokemon
│   │
│   ├── 📂 api/
│   │   └── 🌐 pokeapi.js          # Configuración de la API
│   │
│   ├── 📂 helpers/                # 🆕 Módulos de lógica de negocio
│   │   ├── 📋 README.md           # Documentación de helpers
│   │   ├── 🔧 pokemonService.js   # Lógica de API y formateo
│   │   ├── 🚨 alertService.js     # Manejo de alertas centralizadas
│   │   ├── 🎨 uiUtils.js          # Utilidades de UI y transiciones
│   │   └── 🎯 usePokemonSearch.js # Composable para Composition API
│   │
│   └── 📂 styles/                 # 🆕 Estilos modulares SCSS
│       ├── 📋 README.md           # Documentación de estilos
│       ├── 📄 index.scss          # Archivo principal de estilos
│       ├── 🎨 main.scss           # Variables globales y estilos base
│       ├── 🏠 header.scss         # Estilos del header responsivo
│       ├── 🃏 pokemon-card.scss   # Tarjeta de Pokemon
│       ├── 📱 modal.scss          # Modal de detalles
│       ├── ✨ animations.scss     # Animaciones y keyframes
│       └── 🔄 transitions.scss    # Transiciones de Vue.js
```

### 🧩 **Módulos Principales**

#### 🔧 **pokemonService.js**
```javascript
// Funciones principales:
✅ validatePokemonInput() - Validación de entrada
✅ searchCompletePokemon() - Búsqueda completa de datos
✅ formatHeight/Weight/Id() - Formateo de datos
```

#### 🚨 **alertService.js**
```javascript
// Sistema de alertas centralizadas:
✅ showEmptyFieldAlert() - Campo vacío
✅ showPokemonFoundAlert() - Pokemon encontrado
✅ showErrorAlert() - Manejo unificado de errores
```

#### 🎨 **uiUtils.js**
```javascript
// Utilidades de interfaz:
✅ createTransitionController() - Control de transiciones
✅ delay() - Promesas temporizadas
✅ validationUtils - Utilidades de validación
```

## 🚀 **Refactorización Completa**

### 📊 **Antes vs Después**

| Aspecto | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Líneas en App.vue** | 800+ líneas | 160 líneas | -80% |
| **Archivos de código** | 1 monolítico | 4 helpers modulares | +300% modularidad |
| **Archivos de estilos** | 1 archivo | 7 archivos temáticos | +600% organización |
| **Reutilización** | 0% | 100% | ♾️ |
| **Mantenibilidad** | Difícil | Excelente | 🚀 |

### ✨ **Mejoras Implementadas**

#### 🔧 **Refactorización del Código**
- ✅ Separación completa del script de `App.vue`
- ✅ Creación de helpers especializados
- ✅ Funciones puras y reutilizables
- ✅ Compatibilidad con Options API y Composition API

#### 🎨 **Modularización de Estilos**
- ✅ SCSS organizado por componentes
- ✅ Variables globales centralizadas
- ✅ Sistema de imports optimizado
- ✅ Media queries responsivas separadas

#### 📚 **Documentación Profesional**
- ✅ READMEs detallados para cada módulo
- ✅ Ejemplos de uso y patrones
- ✅ Guías de implementación
- ✅ Comentarios JSDoc en el código

## 🛠️ **Tecnologías Utilizadas**

### 🎯 **Frontend**
- **Vue.js 3.2+** - Framework progresivo
- **Vue CLI 5** - Herramientas de desarrollo
- **SCSS/Sass** - Preprocesador CSS modular
- **ES6+ Modules** - Módulos JavaScript modernos

### 🎨 **UI/UX**
- **SweetAlert2** - Alertas elegantes y personalizables
- **Google Fonts (Changa)** - Tipografía temática
- **CSS Grid & Flexbox** - Layouts responsivos
- **CSS Animations** - Transiciones suaves

### 🌐 **API & Datos**
- **PokeAPI v2** - Base de datos oficial de Pokemon
- **Fetch API** - Peticiones HTTP nativas
- **Async/Await** - Manejo de promesas moderno

### 🚀 **Desarrollo & Deploy**
- **GitHub Pages** - Hosting gratuito
- **gh-pages** - Automatización de deploy
- **Webpack** - Bundling optimizado
- **Babel** - Transpilación ES6+

## 🚀 **Instalación y Uso**

### 📋 **Requisitos Previos**
- Node.js 14+
- npm 6+ o yarn 1.22+

### ⚡ **Instalación Rápida**

```bash
# Clonar el repositorio
git clone https://github.com/erizhi1/pokemon.git

# Navegar al directorio
cd pokemon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run serve

# Construir para producción
npm run build

# Deploy a GitHub Pages
npm run deploy
```

### 🌐 **URLs Disponibles**

- **🔧 Desarrollo:** `http://localhost:8080`
- **🌍 Producción:** `https://erizhi1.github.io/pokemon/`

## 📖 **Guía de Uso**

### 🔍 **Buscar un Pokemon**

1. **Por ID numérico:** Ingresa un número del 1 al 1025
   ```
   Ejemplo: 25 (Pikachu)
   ```

2. **Por nombre:** Escribe el nombre en inglés
   ```
   Ejemplo: charizard, pikachu, mew
   ```

3. **Presiona Enter** o haz clic en "Buscar Pokemon"

### 📊 **Información Mostrada**

#### 🃏 **Tarjeta Principal**
- Imagen oficial del Pokemon
- Nombre formateado
- Tipo(s) con colores temáticos
- Estadísticas principales
- Lista de movimientos
- Hábitat natural

#### 📱 **Modal de Detalles**
- Medidas físicas (altura/peso)
- Experiencia base
- ID nacional formateado
- Habilidades (normales y ocultas)

## 🎨 **Características de Diseño**

### 🌈 **Paleta de Colores Temática**
- **Pokedex Red:** `#dc143c` - Elementos principales
- **Pokedex Green:** `#32cd32` - Fondo principal
- **Pokedex Blue:** `#4169e1` - Acentos y detalles

### ✨ **Animaciones Fluidas**
- **Entrada escalonada** de elementos
- **Spinner de Pokeball** durante la carga
- **Transiciones suaves** entre estados
- **Efectos hover** interactivos

### 📱 **Diseño Responsivo**
- **Desktop:** Diseño horizontal optimizado
- **Tablet:** Adaptación a pantallas medianas
- **Mobile:** Layout vertical para móviles

## 🧪 **Ejemplos de Uso**

### 🔍 **Búsquedas Populares**
- `1` - Bulbasaur (primer Pokemon)
- `25` - Pikachu (mascota oficial)
- `150` - Mewtwo (legendario clásico)
- `charizard` - Por nombre
- `mew` - Pokemon mítico

### ⚠️ **Manejo de Errores**
- **Campo vacío:** Alerta descriptiva
- **ID fuera de rango:** Sugerencias de rango válido
- **Pokemon inexistente:** Consejos de búsqueda
- **Error de conexión:** Botón de reintento

## 🤝 **Contribución**

### 🛠️ **Para Desarrolladores**

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

### 📝 **Estándares de Código**
- **Vue.js Style Guide** - Convenciones oficiales
- **ESLint** - Linting automático
- **Prettier** - Formateo consistente
- **Comentarios JSDoc** - Documentación inline

## 📈 **Roadmap Futuro**

### 🎯 **v2.0 - Próximas Características**
- [ ] 🔍 Búsqueda avanzada con filtros
- [ ] 💾 Favoritos persistentes
- [ ] 🌙 Modo oscuro/claro
- [ ] 🗣️ Sonidos de Pokemon
- [ ] 🎨 Temas personalizables

### 🚀 **v3.0 - Expansión**
- [ ] 📊 Comparador de Pokemon
- [ ] 🏆 Sistema de equipos
- [ ] 🌍 Información de regiones
- [ ] 📱 PWA (Progressive Web App)
- [ ] 🔄 Modo offline

## 📊 **Métricas de Performance**

### ⚡ **Optimizaciones de Build**
```
📦 Tamaños optimizados:
├── JavaScript: 10.24 KiB → 4.05 KiB (gzipped)
├── CSS: 9.70 KiB → 2.17 KiB (gzipped)
└── Vendors: 179.43 KiB → 57.74 KiB (gzipped)

🏆 Reducción total: ~64% con compresión gzip
⚡ Tiempo de build: ~6 segundos
```

### 🎯 **Lighthouse Score**
- **Performance:** 95+
- **Accessibility:** 90+
- **Best Practices:** 95+
- **SEO:** 90+

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 **Autor**

**Erich** - [@erizhi1](https://github.com/erizhi1)

## 🙏 **Agradecimientos**

- **[PokeAPI](https://pokeapi.co/)** - Por la increíble API gratuita
- **[Vue.js Team](https://vuejs.org/)** - Por el framework extraordinario
- **[SweetAlert2](https://sweetalert2.github.io/)** - Por las alertas elegantes
- **Pokemon Company** - Por crear este universo maravilloso

---

<div align="center">
  <p><strong>¿Te gusta el proyecto? ¡Dale una ⭐ si te fue útil!</strong></p>
  
  **[🔗 Ver Demo en Vivo](https://erizhi1.github.io/pokemon/) | [📂 Código Fuente](https://github.com/erizhi1/pokemon) | [🐛 Reportar Bug](https://github.com/erizhi1/pokemon/issues)**
</div>
