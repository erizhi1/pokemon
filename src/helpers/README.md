# ?? Helpers Modulares - Lógica de Negocio

Esta carpeta contiene todos los módulos de lógica de negocio separados del componente principal para mantener un código limpio, reutilizable y testeable.

## ?? **Estructura de Archivos**

```
helpers/
??? ?? pokemonService.js   # Lógica de API y formateo de datos
??? ?? alertService.js     # Manejo centralizado de alertas
??? ?? uiUtils.js          # Utilidades de interfaz y transiciones
??? ?? usePokemonSearch.js # Composable para Composition API
```

## ?? **Propósito de Cada Helper**

### ?? **pokemonService.js**
- **Función**: Lógica principal de búsqueda y formateo de Pokemon
- **Responsabilidades**:
  - Validación de entrada del usuario
  - Comunicación con la PokeAPI
  - Formateo de datos (altura, peso, ID)
  - Manejo de errores de API

**Funciones principales**:
```javascript
? validatePokemonInput(input) - Validación de entrada
? searchCompletePokemon(query) - Búsqueda completa
? formatHeight(height) - Formateo de altura
? formatWeight(weight) - Formateo de peso
? formatId(id) - Formateo de ID nacional
```

### ?? **alertService.js**
- **Función**: Sistema centralizado de alertas con SweetAlert2
- **Responsabilidades**:
  - Alertas de error estandarizadas
  - Mensajes de éxito personalizados
  - Confirmaciones de usuario
  - Estilos consistentes

**Funciones principales**:
```javascript
? showEmptyFieldAlert() - Campo vacío
? showPokemonFoundAlert(pokemon) - Pokemon encontrado
? showErrorAlert(type, details) - Errores específicos
? showNetworkErrorAlert() - Errores de conexión
```

### ?? **uiUtils.js**
- **Función**: Utilidades de interfaz y control de transiciones
- **Responsabilidades**:
  - Control de estados de carga
  - Animaciones y transiciones
  - Utilidades de validación
  - Helpers de UI reutilizables

**Funciones principales**:
```javascript
? createTransitionController() - Control de transiciones
? delay(ms) - Promesas temporizadas
? validationUtils - Utilidades de validación
? toggleLoadingState() - Estados de carga
```

### ?? **usePokemonSearch.js**
- **Función**: Composable para Vue 3 Composition API
- **Responsabilidades**:
  - Lógica reactiva de búsqueda
  - Estado compartido entre componentes
  - Hooks reutilizables
  - Integración con Composition API

**Composables principales**:
```javascript
? usePokemonSearch() - Hook principal de búsqueda
? usePokemonState() - Estado reactivo
? usePokemonValidation() - Validación reactiva
? usePokemonApi() - Integración con API
```

## ?? **Ventajas de la Modularización**

### ? **Separación de Responsabilidades**
- **Lógica de negocio** separada de la UI
- **Funciones puras** fáciles de testear
- **Reutilización** en múltiples componentes
- **Mantenimiento** simplificado

### ? **Testabilidad**
- **Unit tests** independientes por módulo
- **Mocking** fácil de dependencias
- **Cobertura** granular de código
- **CI/CD** más eficiente

### ? **Escalabilidad**
- **Nuevas funcionalidades** sin tocar código existente
- **Refactoring** aislado por módulo
- **Equipos** trabajando en paralelo
- **Documentación** específica

## ?? **Guía de Uso**

### ?? **Importación en Vue Options API**
```javascript
// En App.vue
import { validatePokemonInput, searchCompletePokemon } from '@/helpers/pokemonService.js'
import { showEmptyFieldAlert, showPokemonFoundAlert } from '@/helpers/alertService.js'
import { createTransitionController } from '@/helpers/uiUtils.js'

export default {
  name: 'App',
  methods: {
    async searchPokemon() {
      // Usar las funciones importadas
      const isValid = validatePokemonInput(this.searchQuery)
      if (!isValid) {
        showEmptyFieldAlert()
        return
      }
      
      const pokemon = await searchCompletePokemon(this.searchQuery)
      showPokemonFoundAlert(pokemon)
    }
  }
}
```

### ?? **Uso con Composition API**
```javascript
// En un componente con setup()
import { usePokemonSearch } from '@/helpers/usePokemonSearch.js'

export default {
  setup() {
    const {
      searchQuery,
      pokemon,
      isLoading,
      searchPokemon,
      resetSearch
    } = usePokemonSearch()
    
    return {
      searchQuery,
      pokemon,
      isLoading,
      searchPokemon,
      resetSearch
    }
  }
}
```

## ?? **Ejemplos de Implementación**

### ?? **Búsqueda de Pokemon**
```javascript
// pokemonService.js
export async function searchCompletePokemon(query) {
  try {
    // 1. Validar entrada
    const validationResult = validatePokemonInput(query)
    if (!validationResult.isValid) {
      throw new Error(validationResult.message)
    }
    
    // 2. Buscar Pokemon base
    const pokemon = await searchPokemon(query)
    
    // 3. Buscar información adicional
    const species = await searchPokemonSpecies(pokemon.id)
    
    // 4. Formatear datos
    return {
      ...pokemon,
      formattedHeight: formatHeight(pokemon.height),
      formattedWeight: formatWeight(pokemon.weight),
      formattedId: formatId(pokemon.id),
      habitat: species.habitat?.name || 'Desconocido'
    }
  } catch (error) {
    console.error('Error en búsqueda completa:', error)
    throw error
  }
}
```

### ?? **Sistema de Alertas**
```javascript
// alertService.js
export function showPokemonFoundAlert(pokemon) {
  Swal.fire({
    title: `¡${pokemon.name} encontrado!`,
    text: `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`,
    icon: 'success',
    confirmButtonText: 'Ver detalles',
    confirmButtonColor: '#dc143c'
  })
}
```

## ??? **Mejores Prácticas**

### ? **Estructura de Funciones**
```javascript
/**
 * Descripción de la función
 * @param {string} input - Parámetro de entrada
 * @returns {Object} - Objeto con resultado
 */
export function myFunction(input) {
  // 1. Validación de parámetros
  if (!input || typeof input !== 'string') {
    throw new Error('Parámetro inválido')
  }
  
  // 2. Lógica principal
  const result = processInput(input)
  
  // 3. Retorno consistente
  return {
    success: true,
    data: result,
    message: 'Operación exitosa'
  }
}
```

### ? **Manejo de Errores**
```javascript
// Estructura consistente de errores
export class PokemonServiceError extends Error {
  constructor(message, type, details = {}) {
    super(message)
    this.name = 'PokemonServiceError'
    this.type = type // 'VALIDATION', 'NETWORK', 'NOT_FOUND'
    this.details = details
  }
}
```

### ? **Documentación JSDoc**
```javascript
/**
 * Busca un Pokemon por ID o nombre
 * @async
 * @function searchCompletePokemon
 * @param {string|number} query - ID numérico o nombre del Pokemon
 * @returns {Promise<Object>} Pokemon con datos completos y formateados
 * @throws {PokemonServiceError} Error específico de la búsqueda
 * @example
 * const pikachu = await searchCompletePokemon('pikachu')
 * const charizard = await searchCompletePokemon(6)
 */
```

## ?? **Migración desde Monolítico**

### ?? **Antes vs Después**

| Aspecto | Antes (App.vue) | Después (Helpers) |
|---------|-----------------|-------------------|
| **Líneas de código** | 800+ líneas | 160 líneas |
| **Funciones** | 15+ en un archivo | 4 archivos especializados |
| **Testabilidad** | Difícil | Excelente |
| **Reutilización** | 0% | 100% |
| **Mantenimiento** | Complejo | Simple |

### ?? **Proceso de Refactorización**
1. **Identificación** de responsabilidades
2. **Extracción** de funciones puras
3. **Agrupación** por dominio
4. **Creación** de módulos específicos
5. **Testing** individual
6. **Integración** gradual

## ?? **Roadmap de Helpers**

### ?? **v2.0 - Próximas Mejoras**
- [ ] ?? Tests unitarios completos
- [ ] ?? Sistema de métricas y analytics
- [ ] ?? Cache inteligente de búsquedas
- [ ] ?? Retry automático en errores

### ?? **v3.0 - Funcionalidades Avanzadas**
- [ ] ?? Búsqueda con IA/ML
- [ ] ?? Offline support
- [ ] ?? Internacionalización
- [ ] ?? Gamificación

## ?? **Testing de Helpers**

### ?? **Estructura de Tests**
```javascript
// tests/helpers/pokemonService.test.js
import { validatePokemonInput, formatHeight } from '@/helpers/pokemonService.js'

describe('pokemonService', () => {
  describe('validatePokemonInput', () => {
    test('should validate numeric input', () => {
      const result = validatePokemonInput('25')
      expect(result.isValid).toBe(true)
    })
    
    test('should validate string input', () => {
      const result = validatePokemonInput('pikachu')
      expect(result.isValid).toBe(true)
    })
    
    test('should reject empty input', () => {
      const result = validatePokemonInput('')
      expect(result.isValid).toBe(false)
    })
  })
})
```

## ?? **Consejos para Contribuir**

1. **Mantén funciones puras** siempre que sea posible
2. **Documenta con JSDoc** todas las funciones públicas
3. **Sigue la nomenclatura** consistente del proyecto
4. **Agrega tests** para nuevas funcionalidades
5. **Maneja errores** de forma específica y descriptiva
6. **Usa TypeScript** para mayor seguridad de tipos

¿Necesitas agregar nueva lógica? ¡Sigue el patrón modular! ??
