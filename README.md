# 🔍 Pokémon Search App

Una aplicación web moderna desarrollada en Vue.js 3 que permite buscar y explorar información detallada de Pokémon utilizando la PokéAPI.

## ✨ Características

- 🔎 **Búsqueda flexible**: Busca Pokémon por ID numérico o nombre
- 📊 **Información completa**: Muestra estadísticas, tipos, movimientos y hábitat
- 🎨 **Diseño responsivo**: Optimizada para dispositivos móviles y desktop
- 🪟 **Modal de detalles**: Información adicional con medidas, experiencia, ID nacional y habilidades
- 🎯 **Tipografía personalizada**: Fuente Changa de Google Fonts para mejor experiencia visual
- 🌈 **Colores por tipo**: Cada tipo de Pokémon tiene su color característico

## 🚀 Demo

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
