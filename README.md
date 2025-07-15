# ?? Pokemon Search App

> **Una aplicaci�n web moderna y modular para buscar informaci�n detallada de Pokemon usando la PokeAPI**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.2+-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Modular-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-181717?style=flat&logo=github&logoColor=white)](https://erizhi1.github.io/pokemon/)
[![PokeAPI](https://img.shields.io/badge/PokeAPI-v2-FF6B6B?style=flat&logo=pokemon&logoColor=white)](https://pokeapi.co/)

## ?? **Demo en Vivo**

?? **[Ver Aplicaci�n](https://erizhi1.github.io/pokemon/)**

## ?? **Capturas de Pantalla**

<div align="center">
  <img src="docs/screenshot-main.png" alt="Pantalla Principal" width="45%">
  <img src="docs/screenshot-modal.png" alt="Modal de Detalles" width="45%">
</div>

## ? **Caracter�sticas Principales**

### ?? **B�squeda Inteligente**
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
- **?? Producci�n:** `https://erizhi1.github.io/pokemon/`

## ?? **Gu�a de Uso**

### ?? **Buscar un Pokemon**

1. **Por ID num�rico:** Ingresa un n�mero del 1 al 1025
   ```
   Ejemplo: 25 (Pikachu)
   ```

2. **Por nombre:** Escribe el nombre en ingl�s
   ```
   Ejemplo: charizard, pikachu, mew
   ```

3. **Presiona Enter** o haz clic en "Buscar Pokemon"

### ?? **Informaci�n Mostrada**

#### ?? **Tarjeta Principal**
- Imagen oficial del Pokemon
- Nombre formateado
- Tipo(s) con colores tem�ticos
- Estad�sticas principales
- Lista de movimientos
- H�bitat natural

#### ?? **Modal de Detalles**
- Medidas f�sicas (altura/peso)
- Experiencia base
- ID nacional formateado
- Habilidades (normales y ocultas)

## ?? **Caracter�sticas de Dise�o**

### ?? **Paleta de Colores Tem�tica**
- **Pokedex Red:** `#dc143c` - Elementos principales
- **Pokedex Green:** `#32cd32` - Fondo principal
- **Pokedex Blue:** `#4169e1` - Acentos y detalles

### ? **Animaciones Fluidas**
- **Entrada escalonada** de elementos
- **Spinner de Pokeball** durante la carga
- **Transiciones suaves** entre estados
- **Efectos hover** interactivos

### ?? **Dise�o Responsivo**
- **Desktop:** Dise�o horizontal optimizado
- **Tablet:** Adaptaci�n a pantallas medianas
- **Mobile:** Layout vertical para m�viles

## ?? **Ejemplos de Uso**

### ?? **B�squedas Populares**
- `1` - Bulbasaur (primer Pokemon)
- `25` - Pikachu (mascota oficial)
- `150` - Mewtwo (legendario cl�sico)
- `charizard` - Por nombre
- `mew` - Pokemon m�tico

### ?? **Manejo de Errores**
- **Campo vac�o:** Alerta descriptiva
- **ID fuera de rango:** Sugerencias de rango v�lido
- **Pokemon inexistente:** Consejos de b�squeda
- **Error de conexi�n:** Bot�n de reintento

## ?? **Contribuci�n**

### ??? **Para Desarrolladores**

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva caracter�stica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

### ?? **Est�ndares de C�digo**
- **Vue.js Style Guide** - Convenciones oficiales
- **ESLint** - Linting autom�tico
- **Prettier** - Formateo consistente
- **Comentarios JSDoc** - Documentaci�n inline

## ?? **Roadmap Futuro**

### ?? **v2.0 - Pr�ximas Caracter�sticas**
- [ ] ?? B�squeda avanzada con filtros
- [ ] ?? Favoritos persistentes
- [ ] ?? Modo oscuro/claro
- [ ] ??? Sonidos de Pokemon
- [ ] ?? Temas personalizables

### ?? **v3.0 - Expansi�n**
- [ ] ?? Comparador de Pokemon
- [ ] ?? Sistema de equipos
- [ ] ?? Informaci�n de regiones
- [ ] ?? PWA (Progressive Web App)
- [ ] ?? Modo offline

## ?? **M�tricas de Performance**

### ? **Optimizaciones de Build**
```
?? Tama�os optimizados:
??? JavaScript: 10.24 KiB ? 4.05 KiB (gzipped)
??? CSS: 9.70 KiB ? 2.17 KiB (gzipped)
??? Vendors: 179.43 KiB ? 57.74 KiB (gzipped)

?? Reducci�n total: ~64% con compresi�n gzip
? Tiempo de build: ~6 segundos
```

### ?? **Lighthouse Score**
- **Performance:** 95+
- **Accessibility:** 90+
- **Best Practices:** 95+
- **SEO:** 90+

## ?? **Licencia**

Este proyecto est� bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para m�s detalles.

## ?? **Autor**

**Erich** - [@erizhi1](https://github.com/erizhi1)

## ?? **Agradecimientos**

- **[PokeAPI](https://pokeapi.co/)** - Por la incre�ble API gratuita
- **[Vue.js Team](https://vuejs.org/)** - Por el framework extraordinario
- **[SweetAlert2](https://sweetalert2.github.io/)** - Por las alertas elegantes
- **Pokemon Company** - Por crear este universo maravilloso

---

<div align="center">
  <p><strong>�Te gusta el proyecto? �Dale una ? si te fue �til!</strong></p>
  
  **[?? Ver Demo en Vivo](https://erizhi1.github.io/pokemon/) | [?? C�digo Fuente](https://github.com/erizhi1/pokemon) | [?? Reportar Bug](https://github.com/erizhi1/pokemon/issues)**
</div>
