<template>
  <div>
    <header class="header">
      <label for="">
        Escribe el Pokemon que quieras buscar (por ID o nombre):
        <input type="text" v-model="pokemonID" placeholder="Ej: pikachu, charizard o 1-1025" @keyup.enter="searchPokemon" />
        <button class="searchButton" @click="searchPokemon">Buscar Pokemon</button>
      </label>
    </header>
    <main class="main" v-if="Object.entries(pokemonData).length > 0 || isLoading">
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="loading-container">
        <div class="pokeball-spinner">
          <div class="pokeball-top"></div>
          <div class="pokeball-middle"></div>
          <div class="pokeball-bottom"></div>
        </div>
        <p class="loading-text">Buscando Pokémon...</p>
      </div>

      <!-- Tarjeta del Pokémon con transición -->
      <transition name="pokemon-card" appear>
        <section v-if="!isLoading && Object.entries(pokemonData).length > 0 && showCard" class="pokemonCard">
        <div class="nameImage">
          <h1 class="pokemonName">{{ pokemonData.name }}</h1>
          <img :src="pokemonData.sprites.front_default" :alt="pokemonData.name" >
          <button class="detailsButton" @click="showModal = true">Ver más detalles</button>
        </div>
        <ul class="type">
          <h2>Tipo:</h2>
          <li v-for="(type, index) in pokemonData.types" :key="index" :class="type.type.name">
            <span>{{ type.type.name }}</span>
          </li>
        </ul>
        <ul class="stats">
          <h2>Stats</h2>
          <li v-for="(stat, index) in pokemonData.stats" :key="index" :class="stat.stat.name">
            <span>{{ stat.stat.name }} => {{ stat.base_stat }} </span>
          </li>
        </ul>
        <ul class="moves">
          <h2>Movimientos</h2>
          <li v-for="(move, index) in pokemonData.moves.slice(0, 10)" :key="index">
            <span>{{ move.move.name }}</span>
          </li>
        </ul>
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
    
    <!-- Modal para información adicional con transición -->
    <transition name="modal" appear>
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ pokemonData.name }} - Información adicional</h2>
            <button class="close-button" @click="showModal = false">×</button>
          </div>
        <div class="modal-body">
          <div class="modal-section">
            <h3>📏 Medidas</h3>
            <p><strong>Altura:</strong> {{ formatHeight(pokemonData.height) }} m</p>
            <p><strong>Peso:</strong> {{ formatWeight(pokemonData.weight) }} kg</p>
          </div>
          <div class="modal-section">
            <h3>⭐ Experiencia</h3>
            <p><strong>Experiencia base:</strong> {{ pokemonData.base_experience }} XP</p>
          </div>
          <div class="modal-section">
            <h3>🔢 Identificador</h3>
            <p><strong>ID Nacional:</strong> #{{ formatPokemonId(pokemonData.id) }}</p>
          </div>
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
// Importar helpers
import { validatePokemonInput, searchCompletePokemon, formatPokemonName, formatHeight, formatWeight, formatPokemonId } from "@/helpers/pokemonService";
import { showErrorAlert, showPokemonFoundAlert } from "@/helpers/alertService";
import { createTransitionController } from "@/helpers/uiUtils";

export default {
  name: "App",
  data() {
    return {
      pokemonData: {},
      pokemonSpecies: {},
      pokemonID: '',
      showModal: false,
      isLoading: false,
      showCard: false,
    }
  },
  created() {
    // Inicializar controlador de transiciones
    this.transitionController = createTransitionController(
      (loading) => { this.isLoading = loading; },
      (show) => { this.showCard = show; }
    );
  },
  methods: {
    async searchPokemon() {
      const inputValue = this.pokemonID;

      // Validar input usando el helper
      const validation = validatePokemonInput(inputValue);
      if (!validation.isValid) {
        showErrorAlert(validation.error, inputValue, validation.message);
        return;
      }

      try {
        // Iniciar secuencia de transición
        await this.transitionController.startSearchSequence();

        // Buscar Pokémon usando el helper
        const { pokemon, species } = await searchCompletePokemon(validation.input);
        
        // Actualizar datos
        this.pokemonData = pokemon;
        this.pokemonSpecies = species;

        // Finalizar secuencia de éxito
        await this.transitionController.finishSuccessSequence();

        // Mostrar alerta de éxito
        const formattedName = formatPokemonName(pokemon.name);
        showPokemonFoundAlert(formattedName);

        // Limpiar campo de búsqueda
        this.pokemonID = '';

        // Log para debugging
        console.log('Pokémon encontrado:', pokemon);
        console.log('Especies:', species);

        return pokemon;

      } catch (error) {
        // Manejar errores
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

    // Métodos de formateo importados como helpers
    formatHeight,
    formatWeight,
    formatPokemonId
  }
}

</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
