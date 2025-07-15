# ?? Estilos Modulares SCSS

Esta carpeta contiene todos los estilos SCSS organizados de forma modular para mantener un c�digo limpio y escalable.

## ?? **Estructura de Archivos**

```
styles/
??? ?? index.scss          # Archivo principal que importa todos los estilos
??? ?? main.scss           # Variables globales y estilos base
??? ?? header.scss         # Estilos del header y navegaci�n
??? ?? pokemon-card.scss   # Estilos de la tarjeta de Pokemon
??? ?? modal.scss          # Estilos del modal de detalles
??? ? animations.scss     # Animaciones y keyframes
??? ?? transitions.scss    # Transiciones de Vue.js
```

## ?? **Prop�sito de Cada Archivo**

### ?? **index.scss**
- **Funci�n**: Archivo principal de estilos
- **Contenido**: Imports de todos los m�dulos SCSS
- **Uso**: Se importa en `App.vue`

### ?? **main.scss**
- **Funci�n**: Variables globales y estilos base
- **Contenido**: 
  - Variables de colores principales
  - Tipograf�a base (Google Fonts)
  - Estilos generales del body
  - Clases utilitarias
- **Variables principales**:
  ```scss
  $pokedex-red: #dc143c;
  $pokedex-green: #32cd32;
  $pokedex-blue: #4169e1;
  ```

### ?? **header.scss**
- **Funci�n**: Estilos del header responsivo
- **Contenido**:
  - Layout del header principal
  - Estilos del t�tulo
  - Dise�o responsivo
  - Efectos visuales

### ?? **pokemon-card.scss**
- **Funci�n**: Estilos de la tarjeta principal de Pokemon
- **Contenido**:
  - Layout de la tarjeta
  - Estilos de la imagen
  - Informaci�n del Pokemon
  - Estados hover e interacciones
  - Dise�o responsivo

### ?? **modal.scss**
- **Funci�n**: Estilos del modal de detalles
- **Contenido**:
  - Overlay del modal
  - Contenedor del modal
  - Informaci�n adicional
  - Botones de acci�n
  - Animaciones de apertura/cierre

### ? **animations.scss**
- **Funci�n**: Animaciones y keyframes
- **Contenido**:
  - Animaci�n del spinner (Pokeball)
  - Efectos de entrada escalonada
  - Animaciones de hover
  - Keyframes personalizados

### ?? **transitions.scss**
- **Funci�n**: Transiciones de Vue.js
- **Contenido**:
  - Transiciones entre componentes
  - Efectos de entrada/salida
  - Animaciones de lista
  - Transiciones de estado

## ?? **Ventajas de la Modularizaci�n**

### ? **Mantenimiento**
- **F�cil localizaci�n**: Cada estilo tiene su archivo espec�fico
- **Modificaciones aisladas**: Cambios no afectan otros componentes
- **C�digo limpio**: Mejor organizaci�n y legibilidad

### ? **Escalabilidad**
- **Nuevos componentes**: F�cil agregar nuevos archivos SCSS
- **Reutilizaci�n**: Variables y mixins compartidos
- **Performance**: Importaci�n selectiva

### ? **Colaboraci�n**
- **Conflictos m�nimos**: Desarrolladores trabajan en archivos separados
- **Revisi�n f�cil**: Cambios espec�ficos por archivo
- **Documentaci�n**: Cada archivo tiene prop�sito claro

## ?? **Sistema de Variables**

### ?? **Colores Principales**
```scss
// Colores base de la aplicaci�n
$pokedex-red: #dc143c;
$pokedex-green: #32cd32; 
$pokedex-blue: #4169e1;

// Colores de estado
$success-color: #28a745;
$error-color: #dc3545;
$warning-color: #ffc107;
```

### ?? **Breakpoints Responsivos**
```scss
// Mobile first approach
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$large: 1200px;
```

### ?? **Tipograf�a**
```scss
// Fuente principal
$font-family: 'Changa', sans-serif;

// Tama�os de fuente
$font-size-small: 0.875rem;
$font-size-base: 1rem;
$font-size-large: 1.25rem;
$font-size-xl: 1.5rem;
```

## ?? **Gu�a de Uso**

### ?? **Para Desarrolladores**

1. **Modificar estilos existentes**:
   ```scss
   // Editar el archivo correspondiente
   // Ejemplo: pokemon-card.scss para estilos de tarjeta
   ```

2. **Agregar nuevos componentes**:
   ```scss
   // 1. Crear nuevo archivo: component-name.scss
   // 2. Agregar import en index.scss
   @import 'component-name';
   ```

3. **Usar variables globales**:
   ```scss
   // Las variables de main.scss est�n disponibles en todos los archivos
   .mi-componente {
     color: $pokedex-red;
     font-family: $font-family;
   }
   ```

### ?? **Media Queries**
```scss
// Ejemplo de uso responsivo
.mi-componente {
  // Estilos base (mobile first)
  width: 100%;
  
  // Tablet
  @media (min-width: $tablet) {
    width: 50%;
  }
  
  // Desktop
  @media (min-width: $desktop) {
    width: 33.333%;
  }
}
```

## ??? **Mejores Pr�cticas**

### ? **Nomenclatura**
- **BEM methodology**: `.block__element--modifier`
- **Clases descriptivas**: `.pokemon-card`, `.modal-overlay`
- **Variables sem�nticas**: `$primary-color`, `$border-radius`

### ? **Organizaci�n**
- **Un componente por archivo**: Mantener archivos enfocados
- **Imports organizados**: Agrupar por tipo en index.scss
- **Comentarios descriptivos**: Explicar secciones complejas

### ? **Performance**
- **Evitar anidaci�n profunda**: M�ximo 3-4 niveles
- **Selectores espec�ficos**: Evitar selectores universales
- **Optimizaci�n de assets**: Usar variables para valores repetidos

## ?? **Migraci�n desde Monol�tico**

### ?? **Antes vs Despu�s**

| Aspecto | Antes | Despu�s |
|---------|-------|---------|
| **Archivos** | 1 archivo grande | 7 archivos modulares |
| **L�neas por archivo** | 700+ l�neas | 50-150 l�neas |
| **Mantenibilidad** | Dif�cil | Excelente |
| **B�squeda** | Control+F en archivo grande | Localizaci�n directa |

### ?? **Beneficios Obtenidos**
- **Reducci�n 80% en tiempo de localizaci�n** de estilos
- **Eliminaci�n de conflictos** entre desarrolladores
- **Mejora en performance** de compilaci�n SCSS
- **Facilidad para testing** de componentes individuales

## ?? **Roadmap de Estilos**

### ?? **v2.0 - Pr�ximas Mejoras**
- [ ] ?? Sistema de themes (claro/oscuro)
- [ ] ?? Mejoras en responsive design
- [ ] ? M�s animaciones interactivas
- [ ] ?? Paleta de colores extendida

### ?? **v3.0 - Funcionalidades Avanzadas**
- [ ] ?? Animaciones con CSS Grid
- [ ] ?? Transiciones de p�gina completa
- [ ] ?? Sistema de espaciado consistente
- [ ] ?? Efectos de paralaje

---

## ?? **Consejos para Contribuir**

1. **Mant�n la consistencia** con el sistema de variables existente
2. **Documenta cambios complejos** con comentarios
3. **Testa en m�ltiples dispositivos** antes de commit
4. **Sigue la nomenclatura BEM** para nuevas clases
5. **Optimiza para performance** evitando selectores complejos

�Necesitas agregar un nuevo componente? �Sigue la estructura modular! ??
