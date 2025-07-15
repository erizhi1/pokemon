# 📁 Helpers - Documentación

Esta carpeta contiene los helpers y utilidades para organizar mejor el código de la aplicación Pokémon.

## 📂 Estructura de Archivos

```
helpers/
├── pokemonService.js    # Lógica de API y formateo de datos
├── alertService.js      # Manejo de alertas con SweetAlert2
├── uiUtils.js          # Utilidades para UI y transiciones
└── usePokemonSearch.js # Composable para Composition API (opcional)
```

## 🔧 pokemonService.js

**Propósito**: Maneja todas las operaciones relacionadas con la PokéAPI y formateo de datos.

### Funciones principales:

- `validatePokemonInput(input)` - Valida el input del usuario
- `fetchPokemon(identifier)` - Busca un Pokémon en la API
- `fetchPokemonSpecies(url)` - Busca información de la especie
- `searchCompletePokemon(identifier)` - Busca Pokémon completo (datos + especie)
- `formatPokemonName(name)` - Formatea el nombre
- `formatHeight(height)` - Convierte altura a metros
- `formatWeight(weight)` - Convierte peso a kilogramos
- `formatPokemonId(id)` - Formatea ID con ceros

### Ejemplo de uso:

```javascript
import { searchCompletePokemon, formatPokemonName } from '@/helpers/pokemonService';

const { pokemon, species } = await searchCompletePokemon('pikachu');
const formattedName = formatPokemonName(pokemon.name);
```

## 🚨 alertService.js

**Propósito**: Centraliza todas las alertas usando SweetAlert2 con configuraciones consistentes.

### Funciones principales:

- `showEmptyFieldAlert()` - Alerta de campo vacío
- `showOutOfRangeAlert()` - Alerta de ID fuera de rango
- `showPokemonFoundAlert(name)` - Alerta de éxito
- `showPokemonNotFoundAlert(input)` - Alerta de Pokémon no encontrado
- `showConnectionErrorAlert(message)` - Alerta de error de conexión
- `showErrorAlert(type, input, message)` - Función unificada para errores

### Ejemplo de uso:

```javascript
import { showErrorAlert, showPokemonFoundAlert } from '@/helpers/alertService';

// Mostrar error
showErrorAlert('NOT_FOUND', 'pokemonfake');

// Mostrar éxito
showPokemonFoundAlert('Pikachu');
```

## 🎨 uiUtils.js

**Propósito**: Utilidades para manejo de UI, transiciones y validaciones.

### Funciones principales:

- `delay(ms)` - Promesa con delay
- `createTransitionController(setLoading, setShowCard)` - Controlador de transiciones
- `domUtils` - Utilidades para manipulación del DOM
- `validationUtils` - Utilidades de validación
- `TRANSITION_TIMES` - Constantes de tiempo
- `POKEMON_CONSTANTS` - Constantes de la aplicación

### Ejemplo de uso:

```javascript
import { createTransitionController, delay } from '@/helpers/uiUtils';

const controller = createTransitionController(
  (loading) => { this.isLoading = loading; },
  (show) => { this.showCard = show; }
);

await controller.startSearchSequence();
```

## 🎯 usePokemonSearch.js (Composition API)

**Propósito**: Composable que encapsula toda la lógica de búsqueda para usar con Composition API.

### Estado reactivo:

- `pokemonData` - Datos del Pokémon
- `pokemonSpecies` - Datos de la especie
- `pokemonID` - Input de búsqueda
- `showModal` - Estado del modal
- `isLoading` - Estado de carga
- `showCard` - Estado de la tarjeta

### Métodos:

- `searchPokemon()` - Función principal de búsqueda
- `openModal()` - Abrir modal de detalles
- `closeModal()` - Cerrar modal
- `resetPokemonData()` - Resetear todos los datos
- `hasPokemonData()` - Verificar si hay datos

### Ejemplo de uso (Composition API):

```javascript
import { usePokemonSearch } from '@/helpers/usePokemonSearch';

export default {
  setup() {
    const {
      pokemonData,
      pokemonID,
      isLoading,
      searchPokemon,
      openModal
    } = usePokemonSearch();

    return {
      pokemonData,
      pokemonID,
      isLoading,
      searchPokemon,
      openModal
    };
  }
}
```

## 🔄 Migración desde App.vue

### Antes (en App.vue):
```javascript
// 150+ líneas de lógica mezclada
async searchPokemon() {
  // Validación inline
  // Fetch inline
  // Manejo de errores inline
  // Alertas inline
}
```

### Después (con helpers):
```javascript
// ~40 líneas, código limpio y organizado
import { searchCompletePokemon } from '@/helpers/pokemonService';
import { showErrorAlert } from '@/helpers/alertService';

async searchPokemon() {
  const validation = validatePokemonInput(this.pokemonID);
  if (!validation.isValid) {
    showErrorAlert(validation.error);
    return;
  }
  // ... resto de la lógica simplificada
}
```

## ✅ Beneficios de la Refactorización

1. **Separación de responsabilidades**: Cada archivo tiene un propósito específico
2. **Reutilización**: Los helpers pueden usarse en otros componentes
3. **Testabilidad**: Funciones aisladas son más fáciles de testear
4. **Mantenibilidad**: Cambios centralizados, menos duplicación
5. **Legibilidad**: Código más limpio y fácil de entender
6. **Escalabilidad**: Estructura preparada para crecer

## 🚀 Próximos Pasos

1. **Testing**: Agregar tests unitarios para cada helper
2. **TypeScript**: Convertir a TypeScript para mejor tipado
3. **Más helpers**: Crear helpers específicos para otros componentes
4. **Documentación**: JSDoc para mejor documentación del código

## 📝 Notas de Implementación

- Los helpers mantienen la funcionalidad exacta del código original
- Compatible con Options API y Composition API
- Todas las transiciones y timing se mantienen idénticos
- SweetAlert2 configurado con los mismos estilos
- Conserva todos los console.log para debugging
