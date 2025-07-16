<!-- 
  Aplicación principal para búsqueda y visualización de información de Pokémon
  Utiliza la PokeAPI para obtener datos completos de cualquier Pokémon
-->
<template>
  <div>
    <!-- Header con campo de búsqueda -->
    <header class="header">
      <label for="">
        Escribe el Pokemon que quieras buscar (por ID o nombre):
        <!-- Input que acepta nombres o IDs de Pokémon (1-1025) -->
        <input type="text" v-model="pokemonID" placeholder="Ej: pikachu, charizard o 1-1025" @keyup.enter="searchPokemon" />
        <button class="searchButton" @click="searchPokemon">Buscar Pokemon</button>
      </label>
    </header>
    <!-- Contenido principal que se muestra solo cuando hay datos o está cargando -->
    <main class="main" v-if="Object.entries(pokemonData).length > 0 || isLoading">
      <!-- Spinner de carga con animación de Pokeball -->
      <div v-if="isLoading" class="loading-container">
        <div class="pokeball-spinner">
          <div class="pokeball-top"></div>
          <div class="pokeball-middle"></div>
          <div class="pokeball-bottom"></div>
        </div>
        <p class="loading-text">Buscando Pokémon...</p>
      </div>

      <!-- Tarjeta principal del Pokémon con transición de aparición -->
      <transition name="pokemon-card" appear>
        <section v-if="!isLoading && Object.entries(pokemonData).length > 0 && showCard" class="pokemonCard">
        <!-- Sección de nombre e imagen principal -->
        <div class="nameImage">
          <h1 class="pokemonName">{{ pokemonData.name }}</h1>
          <img :src="pokemonData.sprites.front_default" :alt="pokemonData.name" >
          <button class="detailsButton" @click="showModal = true">Ver más detalles</button>
        </div>
        <!-- Lista de tipos del Pokémon con estilos por tipo -->
        <ul class="type">
          <h2>Tipo:</h2>
          <li v-for="(type, index) in pokemonData.types" :key="index" :class="type.type.name">
            <span>{{ type.type.name }}</span>
          </li>
        </ul>
        <!-- Estadísticas base del Pokémon -->
        <ul class="stats">
          <h2>Stats</h2>
          <li v-for="(stat, index) in pokemonData.stats" :key="index" :class="stat.stat.name">
            <span>{{ stat.stat.name }} => {{ stat.base_stat }} </span>
          </li>
        </ul>
        <!-- Lista de movimientos (primeros 10) -->
        <ul class="moves">
          <h2>Movimientos</h2>
          <li v-for="(move, index) in pokemonData.moves.slice(0, 10)" :key="index">
            <span>{{ move.move.name }}</span>
          </li>
        </ul>
        <!-- Información del hábitat natural -->
        <ul class="habitat">
          <h2>Hábitat</h2>
          <li v-if="pokemonSpecies.habitat">
            <span>{{ pokemonSpecies.habitat.name }}</span>
          </li>
          <li v-else>
            <span>Desconocido</span>
          </li>
        </ul>
      </section>
      </transition>
    </main>
    
    <!-- Modal para mostrar información detallada del Pokémon -->
    <transition name="modal" appear>
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <!-- Contenido del modal que no se cierra al hacer click -->
        <div class="modal-content" @click.stop>
          <!-- Header del modal con título y botón de cierre -->
          <div class="modal-header">
            <h2>{{ pokemonData.name }} - Información adicional</h2>
            <button class="close-button" @click="showModal = false">×</button>
          </div>
        <!-- Cuerpo del modal con información detallada -->
        <div class="modal-body">
          <!-- Sección de medidas físicas -->
          <div class="modal-section">
            <h3>📏 Medidas</h3>
            <p><strong>Altura:</strong> {{ formatHeight(pokemonData.height) }} m</p>
            <p><strong>Peso:</strong> {{ formatWeight(pokemonData.weight) }} kg</p>
          </div>
          <!-- Sección de experiencia base -->
          <div class="modal-section">
            <h3>⭐ Experiencia</h3>
            <p><strong>Experiencia base:</strong> {{ pokemonData.base_experience }} XP</p>
          </div>
          <!-- Sección de identificador nacional -->
          <div class="modal-section">
            <h3>🔢 Identificador</h3>
            <p><strong>ID Nacional:</strong> #{{ formatPokemonId(pokemonData.id) }}</p>
          </div>
          <!-- Sección de habilidades (incluyendo ocultas) -->
          <div class="modal-section">
            <h3>🎮 Habilidades</h3>
            <div class="abilities-list">
              <span v-for="(ability, index) in pokemonData.abilities" :key="index" class="ability-tag">
                {{ ability.ability.name }}
                <small v-if="ability.is_hidden">(oculta)</small>
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
/**
 * Aplicación principal de búsqueda de Pokémon
 * 
 * Esta aplicación permite buscar información detallada de cualquier Pokémon
 * utilizando la PokeAPI. Soporta búsqueda por nombre o ID nacional.
 * 
 * Características principales:
 * - Búsqueda por nombre o ID (1-1025)
 * - Validación de entrada robusta
 * - Interfaz con transiciones y animaciones
 * - Modal con información detallada
 * - Spinner de carga animado
 * - Manejo de errores con alertas descriptivas
 */

// Importar helpers para funcionalidades específicas
import { validatePokemonInput, searchCompletePokemon, formatPokemonName, formatHeight, formatWeight, formatPokemonId } from "@/helpers/pokemonService";
import { showErrorAlert, showPokemonFoundAlert } from "@/helpers/alertService";
import { createTransitionController } from "@/helpers/uiUtils";

export default {
  name: "App",
  
  /**
   * Datos reactivos del componente
   * @returns {Object} Estado inicial del componente
   */
  data() {
    return {
      pokemonData: {},        // Datos principales del Pokémon desde la API
      pokemonSpecies: {},     // Datos de especies para información adicional
      pokemonID: '',          // Valor del input de búsqueda
      showModal: false,       // Control de visibilidad del modal
      isLoading: false,       // Estado de carga para mostrar spinner
      showCard: false,        // Control de animación de aparición de la tarjeta
    }
  },
  
  /**
   * Hook de ciclo de vida - se ejecuta al crear el componente
   * Inicializa el controlador de transiciones
   */
  created() {
    // Inicializar controlador de transiciones con callbacks para estados
    this.transitionController = createTransitionController(
      (loading) => { this.isLoading = loading; },    // Callback para estado de carga
      (show) => { this.showCard = show; }           // Callback para mostrar tarjeta
    );
  },
  
  methods: {
    /**
     * Método principal para buscar un Pokémon
     * Maneja todo el flujo desde validación hasta mostrar resultados
     * @async
     * @returns {Promise<Object|void>} Datos del Pokémon encontrado o void en caso de error
     */
    async searchPokemon() {
      const inputValue = this.pokemonID;

      // Validar input usando el helper de validación
      const validation = validatePokemonInput(inputValue);
      if (!validation.isValid) {
        showErrorAlert(validation.error, inputValue, validation.message);
        return;
      }

      try {
        // Iniciar secuencia de transición (ocultar tarjeta, mostrar loading)
        await this.transitionController.startSearchSequence();

        // Buscar Pokémon completo (datos principales + especies)
        const { pokemon, species } = await searchCompletePokemon(validation.input);
        
        // Actualizar datos reactivos
        this.pokemonData = pokemon;
        this.pokemonSpecies = species;

        // Finalizar secuencia de éxito (ocultar loading, mostrar tarjeta)
        await this.transitionController.finishSuccessSequence();

        // Mostrar alerta de éxito con nombre formateado
        const formattedName = formatPokemonName(pokemon.name);
        showPokemonFoundAlert(formattedName);

        // Limpiar campo de búsqueda para próxima búsqueda
        this.pokemonID = '';

        // Log para debugging en desarrollo
        console.log('Pokémon encontrado:', pokemon);
        console.log('Especies:', species);

        return pokemon;

      } catch (error) {
        // Manejar errores de búsqueda
        this.transitionController.handleErrorSequence();

        // Determinar tipo de error y mostrar alerta apropiada
        if (error.message.includes('no existe') || error.message.includes('404')) {
          showErrorAlert('NOT_FOUND', inputValue);
        } else {
          showErrorAlert('CONNECTION_ERROR', inputValue, error.message);
        }

        console.error('Error en búsqueda de Pokémon:', error);
      }
    },

    // Métodos de formateo importados como helpers para uso en template
    formatHeight,      // Convierte decímetros a metros con formato
    formatWeight,      // Convierte hectogramos a kilogramos con formato  
    formatPokemonId    // Formatea ID con ceros a la izquierda
  }
}

</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
