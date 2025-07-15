# ?? Helpers Modulares - L�gica de Negocio

Esta carpeta contiene todos los m�dulos de l�gica de negocio separados del componente principal para mantener un c�digo limpio, reutilizable y testeable.

## ?? **Estructura de Archivos**

```
helpers/
??? ?? pokemonService.js   # L�gica de API y formateo de datos
??? ?? alertService.js     # Manejo centralizado de alertas
??? ?? uiUtils.js          # Utilidades de interfaz y transiciones
??? ?? usePokemonSearch.js # Composable para Composition API
```

## ?? **Prop�sito de Cada Helper**

### ?? **pokemonService.js**
- **Funci�n**: L�gica principal de b�squeda y formateo de Pokemon
- **Responsabilidades**:
  - Validaci�n de entrada del usuario
  - Comunicaci�n con la PokeAPI
  - Formateo de datos (altura, peso, ID)
  - Manejo de errores de API

**Funciones principales**:
```javascript
? validatePokemonInput(input) - Validaci�n de entrada
? searchCompletePokemon(query) - B�squeda completa
? formatHeight(height) - Formateo de altura
? formatWeight(weight) - Formateo de peso
? formatId(id) - Formateo de ID nacional
```

### ?? **alertService.js**
- **Funci�n**: Sistema centralizado de alertas con SweetAlert2
- **Responsabilidades**:
  - Alertas de error estandarizadas
  - Mensajes de �xito personalizados
  - Confirmaciones de usuario
  - Estilos consistentes

**Funciones principales**:
```javascript
? showEmptyFieldAlert() - Campo vac�o
? showPokemonFoundAlert(pokemon) - Pokemon encontrado
? showErrorAlert(type, details) - Errores espec�ficos
? showNetworkErrorAlert() - Errores de conexi�n
```

### ?? **uiUtils.js**
- **Funci�n**: Utilidades de interfaz y control de transiciones
- **Responsabilidades**:
  - Control de estados de carga
  - Animaciones y transiciones
  - Utilidades de validaci�n
  - Helpers de UI reutilizables

**Funciones principales**:
```javascript
? createTransitionController() - Control de transiciones
? delay(ms) - Promesas temporizadas
? validationUtils - Utilidades de validaci�n
? toggleLoadingState() - Estados de carga
```

### ?? **usePokemonSearch.js**
- **Funci�n**: Composable para Vue 3 Composition API
- **Responsabilidades**:
  - L�gica reactiva de b�squeda
  - Estado compartido entre componentes
  - Hooks reutilizables
  - Integraci�n con Composition API

**Composables principales**:
```javascript
? usePokemonSearch() - Hook principal de b�squeda
? usePokemonState() - Estado reactivo
? usePokemonValidation() - Validaci�n reactiva
? usePokemonApi() - Integraci�n con API
```

## ?? **Ventajas de la Modularizaci�n**

### ? **Separaci�n de Responsabilidades**
- **L�gica de negocio** separada de la UI
- **Funciones puras** f�ciles de testear
- **Reutilizaci�n** en m�ltiples componentes
- **Mantenimiento** simplificado

### ? **Testabilidad**
- **Unit tests** independientes por m�dulo
- **Mocking** f�cil de dependencias
- **Cobertura** granular de c�digo
- **CI/CD** m�s eficiente

### ? **Escalabilidad**
- **Nuevas funcionalidades** sin tocar c�digo existente
- **Refactoring** aislado por m�dulo
- **Equipos** trabajando en paralelo
- **Documentaci�n** espec�fica

## ?? **Gu�a de Uso**

### ?? **Importaci�n en Vue Options API**
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

## ?? **Ejemplos de Implementaci�n**

### ?? **B�squeda de Pokemon**
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
    
    // 3. Buscar informaci�n adicional
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
    console.error('Error en b�squeda completa:', error)
    throw error
  }
}
```

### ?? **Sistema de Alertas**
```javascript
// alertService.js
export function showPokemonFoundAlert(pokemon) {
  Swal.fire({
    title: `�${pokemon.name} encontrado!`,
    text: `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`,
    icon: 'success',
    confirmButtonText: 'Ver detalles',
    confirmButtonColor: '#dc143c'
  })
}
```

## ??? **Mejores Pr�cticas**

### ? **Estructura de Funciones**
```javascript
/**
 * Descripci�n de la funci�n
 * @param {string} input - Par�metro de entrada
 * @returns {Object} - Objeto con resultado
 */
export function myFunction(input) {
  // 1. Validaci�n de par�metros
  if (!input || typeof input !== 'string') {
    throw new Error('Par�metro inv�lido')
  }
  
  // 2. L�gica principal
  const result = processInput(input)
  
  // 3. Retorno consistente
  return {
    success: true,
    data: result,
    message: 'Operaci�n exitosa'
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

### ? **Documentaci�n JSDoc**
```javascript
/**
 * Busca un Pokemon por ID o nombre
 * @async
 * @function searchCompletePokemon
 * @param {string|number} query - ID num�rico o nombre del Pokemon
 * @returns {Promise<Object>} Pokemon con datos completos y formateados
 * @throws {PokemonServiceError} Error espec�fico de la b�squeda
 * @example
 * const pikachu = await searchCompletePokemon('pikachu')
 * const charizard = await searchCompletePokemon(6)
 */
```

## ?? **Migraci�n desde Monol�tico**

### ?? **Antes vs Despu�s**

| Aspecto | Antes (App.vue) | Despu�s (Helpers) |
|---------|-----------------|-------------------|
| **L�neas de c�digo** | 800+ l�neas | 160 l�neas |
| **Funciones** | 15+ en un archivo | 4 archivos especializados |
| **Testabilidad** | Dif�cil | Excelente |
| **Reutilizaci�n** | 0% | 100% |
| **Mantenimiento** | Complejo | Simple |

### ?? **Proceso de Refactorizaci�n**
1. **Identificaci�n** de responsabilidades
2. **Extracci�n** de funciones puras
3. **Agrupaci�n** por dominio
4. **Creaci�n** de m�dulos espec�ficos
5. **Testing** individual
6. **Integraci�n** gradual

## ?? **Roadmap de Helpers**

### ?? **v2.0 - Pr�ximas Mejoras**
- [ ] ?? Tests unitarios completos
- [ ] ?? Sistema de m�tricas y analytics
- [ ] ?? Cache inteligente de b�squedas
- [ ] ?? Retry autom�tico en errores

### ?? **v3.0 - Funcionalidades Avanzadas**
- [ ] ?? B�squeda con IA/ML
- [ ] ?? Offline support
- [ ] ?? Internacionalizaci�n
- [ ] ?? Gamificaci�n

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

1. **Mant�n funciones puras** siempre que sea posible
2. **Documenta con JSDoc** todas las funciones p�blicas
3. **Sigue la nomenclatura** consistente del proyecto
4. **Agrega tests** para nuevas funcionalidades
5. **Maneja errores** de forma espec�fica y descriptiva
6. **Usa TypeScript** para mayor seguridad de tipos

�Necesitas agregar nueva l�gica? �Sigue el patr�n modular! ??
