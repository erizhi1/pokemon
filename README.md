# ?? Pokemo?? **[Ver Aplicaci�n](https://erizhi1.github.io/pokemon/)**

## ?? **Capturas de Pantalla**

<div align="center">
  <img src="docs/screenshot-main.png" alt="Pantalla Principal" width="45%">
  <img src="docs/screenshot-modal.png" alt="Modal de Detalles" width="45%">
</div>

## ? **Caracter�sticas Principales**

### 👤 **Autor**

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
</div>eda Inteligente**
- B�squeda por **ID num�rico** (1-1025) o **nombre** del Pokemon
- Validaci�n en tiempo real con mensajes descriptivos
- Sugerencias autom�ticas en caso de errores

### ?? **Interfaz Moderna**
- Dise�o responsivo y atractivo
- Animaciones suaves y transiciones fluidas
- Spinner de carga tem�tico (Pokeball animada)
- Modal interactivo para informaci�n adicional

### ?? **Informaci�n Completa**
- **Datos b�sicos**: Nombre, imagen, tipo, estad�sticas
- **Movimientos**: Lista de los 10 primeros movimientos
- **H�bitat**: Informaci�n del entorno natural
- **Detalles adicionales**: Altura, peso, experiencia, habilidades

### ? **Performance Optimizada**
- Arquitectura modular y reutilizable
- C�digo organizado en helpers especializados
- Estilos SCSS separados por componentes
- Build optimizado para producci�n

## ??? **Arquitectura T�cnica**

### ?? **Estructura del Proyecto**

```
pokemon/
??? ?? README.md
??? ?? package.json
??? ?? vue.config.js
??? ?? babel.config.js
?
??? ?? public/
?   ??? ??? favicon.ico
?   ??? ?? index.html
?
??? ?? src/
?   ??? ?? App.vue                 # Componente principal (refactorizado)
?   ??? ?? main.js                 # Punto de entrada
?   ??? ?? pokemon_type.scss       # Variables de tipos de Pokemon
?   ?
?   ??? ?? api/
?   ?   ??? ?? pokeapi.js          # Configuraci�n de la API
?   ?
?   ??? ?? helpers/                # ?? M�dulos de l�gica de negocio
?   ?   ??? ?? README.md           # Documentaci�n de helpers
?   ?   ??? ?? pokemonService.js   # L�gica de API y formateo
?   ?   ??? ?? alertService.js     # Manejo de alertas centralizadas
?   ?   ??? ?? uiUtils.js          # Utilidades de UI y transiciones
?   ?   ??? ?? usePokemonSearch.js # Composable para Composition API
?   ?
?   ??? ?? styles/                 # ?? Estilos modulares SCSS
?       ??? ?? README.md           # Documentaci�n de estilos
?       ??? ?? index.scss          # Archivo principal de estilos
?       ??? ?? main.scss           # Variables globales y estilos base
?       ??? ?? header.scss         # Estilos del header responsivo
?       ??? ?? pokemon-card.scss   # Tarjeta de Pokemon
?       ??? ?? modal.scss          # Modal de detalles
?       ??? ? animations.scss     # Animaciones y keyframes
?       ??? ?? transitions.scss    # Transiciones de Vue.js
```

### ?? **M�dulos Principales**

#### ?? **pokemonService.js**
```javascript
// Funciones principales:
? validatePokemonInput() - Validaci�n de entrada
? searchCompletePokemon() - B�squeda completa de datos
? formatHeight/Weight/Id() - Formateo de datos
```

#### ?? **alertService.js**
```javascript
// Sistema de alertas centralizadas:
? showEmptyFieldAlert() - Campo vac�o
? showPokemonFoundAlert() - Pokemon encontrado
? showErrorAlert() - Manejo unificado de errores
```

#### ?? **uiUtils.js**
```javascript
// Utilidades de interfaz:
? createTransitionController() - Control de transiciones
? delay() - Promesas temporizadas
? validationUtils - Utilidades de validaci�n
```

## ?? **Refactorizaci�n Completa**

### ?? **Antes vs Despu�s**

| Aspecto | Antes | Despu�s | Mejora |
|---------|-------|---------|--------|
| **L�neas en App.vue** | 800+ l�neas | 160 l�neas | -80% |
| **Archivos de c�digo** | 1 monol�tico | 4 helpers modulares | +300% modularidad |
| **Archivos de estilos** | 1 archivo | 7 archivos tem�ticos | +600% organizaci�n |
| **Reutilizaci�n** | 0% | 100% | ?? |
| **Mantenibilidad** | Dif�cil | Excelente | ?? |

### ? **Mejoras Implementadas**

#### ?? **Refactorizaci�n del C�digo**
- ? Separaci�n completa del script de `App.vue`
- ? Creaci�n de helpers especializados
- ? Funciones puras y reutilizables
- ? Compatibilidad con Options API y Composition API

#### ?? **Modularizaci�n de Estilos**
- ? SCSS organizado por componentes
- ? Variables globales centralizadas
- ? Sistema de imports optimizado
- ? Media queries responsivas separadas

#### ?? **Documentaci�n Profesional**
- ? READMEs detallados para cada m�dulo
- ? Ejemplos de uso y patrones
- ? Gu�as de implementaci�n
- ? Comentarios JSDoc en el c�digo

## ??? **Tecnolog�as Utilizadas**

### ?? **Frontend**
- **Vue.js 3.2+** - Framework progresivo
- **Vue CLI 5** - Herramientas de desarrollo
- **SCSS/Sass** - Preprocesador CSS modular
- **ES6+ Modules** - M�dulos JavaScript modernos

### ?? **UI/UX**
- **SweetAlert2** - Alertas elegantes y personalizables
- **Google Fonts (Changa)** - Tipograf�a tem�tica
- **CSS Grid & Flexbox** - Layouts responsivos
- **CSS Animations** - Transiciones suaves

### ?? **API & Datos**
- **PokeAPI v2** - Base de datos oficial de Pokemon
- **Fetch API** - Peticiones HTTP nativas
- **Async/Await** - Manejo de promesas moderno

### ?? **Desarrollo & Deploy**
- **GitHub Pages** - Hosting gratuito
- **gh-pages** - Automatizaci�n de deploy
- **Webpack** - Bundling optimizado
- **Babel** - Transpilaci�n ES6+

## ?? **Instalaci�n y Uso**

### ?? **Requisitos Previos**
- Node.js 14+
- npm 6+ o yarn 1.22+

### ? **Instalaci�n R�pida**

```bash
# Clonar el repositorio
git clone https://github.com/erizhi1/pokemon.git

# Navegar al directorio
cd pokemon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run serve

# Construir para producci�n
npm run build

# Deploy a GitHub Pages
npm run deploy
```

### ?? **URLs Disponibles**

- **?? Desarrollo:** `http://localhost:8080`
- **?? Producci�n:** `https://erizhi1.github.io/pokemon/`> **Una aplicaci�n web moderna y modular para buscar informaci�n detallada de Pokemon usando la PokeAPI**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2+-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Modular-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-181717?style=flat&logo=github&logoColor=white)](https://erizhi1.github.io/pokemon/)
[![PokeAPI](https://img.shields.io/badge/PokeAPI-v2-FF6B6B?style=flat&logo=pokemon&logoColor=white)](https://pokeapi.co/)

## ?? **Demo en Vivo**

?? **[Ver Aplicaci�n](https://erizhi1.github.io/pokemon/)**��� Pokémon Search App

Una aplicación web moderna desarrollada en Vue.js 3 que permite buscar y explorar información detallada de Pokémon utilizando la PokéAPI.

## ✨ Características

- 🔎 **Búsqueda flexible**: Busca Pokémon por ID numérico o nombre
- 📊 **Información completa**: Muestra estadísticas, tipos, movimientos y hábitat
- 🎨 **Diseño responsivo**: Optimizada para dispositivos móviles y desktop
- 🪟 **Modal de detalles**: Información adicional con medidas, experiencia, ID nacional y habilidades
- 🎯 **Tipografía personalizada**: Fuente Changa de Google Fonts para mejor experiencia visual
- 🌈 **Colores por tipo**: Cada tipo de Pokémon tiene su color característico

## 🚀 Demo

🌐 **[Ver aplicación en vivo](https://erizhi1.github.io/pokemon/)**

![Pokémon Search Demo](https://via.placeholder.com/800x400?text=Pokemon+Search+App+Demo)

## 🛠️ Tecnologías utilizadas

- **Vue.js 3** - Framework progresivo de JavaScript
- **SCSS** - Preprocesador CSS para estilos avanzados
- **PokéAPI** - API REST para datos de Pokémon
- **Google Fonts** - Tipografía Changa
- **Responsive Design** - Compatible con todos los dispositivos

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/erizhi1/pokemon.git
   cd pokemon
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación en modo desarrollo**
   ```bash
   npm run serve
   ```

4. **Abre tu navegador y visita**
   ```
   http://localhost:8080
   ```

## 🎮 Uso

1. **Buscar Pokémon**: Ingresa el nombre o ID del Pokémon en el campo de búsqueda
2. **Ver información básica**: La tarjeta principal muestra:
   - Imagen del Pokémon
   - Tipos con colores característicos
   - Estadísticas base
   - Primeros 10 movimientos
   - Hábitat natural

3. **Ver detalles adicionales**: Haz clic en "Ver más detalles" para abrir un modal con:
   - Medidas (altura y peso)
   - Experiencia base
   - ID nacional
   - Habilidades (incluyendo las ocultas)

## 📁 Estructura del proyecto

```
pokemon/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/
│   │   └── pokeapi.js          # Configuración de endpoints de API
│   ├── App.vue                 # Componente principal
│   ├── main.js                 # Punto de entrada de la aplicación
│   └── pokemon_type.scss       # Variables de colores por tipo
├── babel.config.js
├── jsconfig.json
├── package.json
├── vue.config.js
└── README.md
```

## 🎨 Características de diseño

### Colores por tipo de Pokémon
La aplicación utiliza colores específicos para cada tipo:
- 🔥 Fuego: Rojo/Naranja
- 💧 Agua: Azul
- 🌱 Planta: Verde
- ⚡ Eléctrico: Amarillo
- Y muchos más...

### Responsive Design
- **Desktop**: Layout horizontal con 5 columnas
- **Tablet** (≤820px): Layout vertical centrado
- **Mobile** (≤600px): Ancho completo optimizado
- **Small Mobile** (≤400px): Texto centrado

## 🔧 Scripts disponibles

```bash
# Desarrollo
npm run serve

# Construcción para producción
npm run build

# Análisis y corrección de código
npm run lint
```

## 📡 API utilizada

Esta aplicación consume datos de:
- **[PokéAPI](https://pokeapi.co/)** - API REST gratuita para datos de Pokémon
- Endpoints utilizados:
  - `GET /pokemon/{id or name}` - Información básica del Pokémon
  - `GET /pokemon-species/{id}` - Información de la especie (hábitat)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Erich** - [erizhi1](https://github.com/erizhi1)

## 🙏 Agradecimientos

- [PokéAPI](https://pokeapi.co/) por proporcionar datos gratuitos de Pokémon
- [Vue.js](https://vuejs.org/) por el excelente framework
- [Google Fonts](https://fonts.google.com/) por la tipografía Changa

---

⭐ ¡No olvides dar una estrella al proyecto si te gustó!
