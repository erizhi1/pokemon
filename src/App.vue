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
    
    <!-- Modal para información adicional -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ pokemonData.name }} - Información adicional</h2>
          <button class="close-button" @click="showModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <h3>📏 Medidas</h3>
            <p><strong>Altura:</strong> {{ (pokemonData.height / 10).toFixed(1) }} m</p>
            <p><strong>Peso:</strong> {{ (pokemonData.weight / 10).toFixed(1) }} kg</p>
          </div>
          <div class="modal-section">
            <h3>⭐ Experiencia</h3>
            <p><strong>Experiencia base:</strong> {{ pokemonData.base_experience }} XP</p>
          </div>
          <div class="modal-section">
            <h3>🔢 Identificador</h3>
            <p><strong>ID Nacional:</strong> #{{ pokemonData.id.toString().padStart(3, '0') }}</p>
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
  </div>
</template>
<script>
import { pokeapi } from "@/api/pokeapi";

export default{
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
  methods: {
    async searchPokemon() {
      if (!this.pokemonID.trim()) {
        alert("Por favor, ingresa un nombre o ID de Pokémon");
        return;
      }

      // Validar que si es un número, esté en el rango válido
      const pokemonInput = this.pokemonID.trim();
      const isNumeric = /^\d+$/.test(pokemonInput);
      
      if (isNumeric) {
        const pokemonNumber = parseInt(pokemonInput);
        if (pokemonNumber < 1 || pokemonNumber > 1025) {
          alert(`ID de Pokémon fuera de rango. Por favor ingresa un número entre 1 y 1025, o usa el nombre del Pokémon.`);
          return;
        }
      }

      try {
        // Mostrar loading y ocultar tarjeta anterior con transición más suave
        this.isLoading = true;
        this.showCard = false;
        
        // Pausa más corta para la transición de salida
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const pokemonTofind = await fetch (`${pokeapi}${this.pokemonID.toLowerCase()}`);
        
        if (!pokemonTofind.ok) {
          // Mensaje de error más específico
          if (pokemonTofind.status === 404) {
            throw new Error(`El Pokémon "${this.pokemonID}" no existe. Verifica el nombre o ID.`);
          } else {
            throw new Error(`Error de conexión (${pokemonTofind.status}). Inténtalo de nuevo.`);
          }
        }
        
        const pokemon = await pokemonTofind.json();
        this.pokemonData = pokemon;
        
        // Obtener información de la especie (incluye hábitat)
        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();
        this.pokemonSpecies = species;
        
        // Pausa optimizada para mostrar el loading
        await new Promise(resolve => setTimeout(resolve, 400));
        
        this.isLoading = false;
        
        // Mostrar la nueva tarjeta con transición de entrada más rápida
        setTimeout(() => {
          this.showCard = true;
        }, 30);
        
        // Limpiar el campo de búsqueda después de encontrar el Pokémon
        this.pokemonID = '';
        
        console.log(pokemon);
        console.log(species);
        return pokemon;
      } catch (error) {
        this.isLoading = false;
        this.showCard = false;
        
        // Mostrar alerta con mensaje personalizado
        if (error.message.includes('no existe') || error.message.includes('404')) {
          alert(`❌ ${error.message}\n\n💡 Sugerencias:\n• Verifica la ortografía del nombre\n• Usa nombres en inglés (ej: pikachu, charizard)\n• Prueba con un ID válido (1-1025)`);
        } else {
          alert(`⚠️ ${error.message}`);
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

@import './pokemon_type.scss';
@import url('https://fonts.googleapis.com/css2?family=Changa:wght@400;700&display=swap');

.header, .main, input[type="text"], .searchButton {
  font-family: 'Changa', sans-serif;
}

.header, input[type="text"], .searchButton {
  font-size: 1.5rem;
}

.main {
  font-size: 1.2rem;
  background-color: $pokedex-green;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: $pokedex-red;
  color: white;

  & .searchButton {
  background-color: #1cb02b;
  color: white;
  border: none;
  margin-left: 10px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #1c8b0a;
  }
}

  & input[type="text"] {
    border-radius: 10px;
    outline: none;
    border: none;
  }
}


.pokemonCard {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  & .nameImage, & .type, & .stats, & .moves, & .habitat {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  & .nameImage {
    & .pokemonName {
      text-transform: capitalize;
    }

    & img {
      width: 200px;
      background-color: $pokedex-blue;
      border-radius: 50%;
    }

    & .detailsButton {
      margin-top: 15px;
      padding: 8px 16px;
      background-color: #ff6b35;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Changa', sans-serif;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e55a2b;
      }
    }
  }

  & .type li {
    width: 90%;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 20px;
  }

  & .stats li {
    align-self: flex-start;
  }
}

ul {
  padding: 0;
}

.type {
  & li {
    list-style: none;
    color: white;
    text-transform: uppercase;
  }
}

.stats {
  color: black;

  & li {
    list-style: none;
    text-transform: uppercase;
  }
}

.moves {
  color: black;

  & li {
    list-style: none;
    text-transform: capitalize;
    margin-bottom: 5px;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    width: 90%;
    text-align: center;
  }
}

.habitat {
  color: black;

  & li {
    list-style: none;
    text-transform: capitalize;
    padding: 10px;
    background-color: rgba(76, 175, 80, 0.2);
    border: 2px solid #4caf50;
    border-radius: 10px;
    width: 90%;
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
  }
}

.normal {
  background-color: $normal
}
.fire {
  background-color: $fire
}
.water {
  background-color: $water
}
.grass {
  background-color: $grass
}
.electric {
  background-color: $electric
}
.ice {
  background-color: $ice
}
.fighting {
  background-color: $fighting
}
.poison {
  background-color: $poison
}
.ground {
  background-color: $ground
}
.flying {
  background-color: $flying
}
.psychic {
  background-color: $psychic
}
.bug {
  background-color: $bug
}
.rock {
  background-color: $rock
}
.ghost {
  background-color: $ghost
}
.dark {
  background-color: $dark
}
.dragon {
  background-color: $dragon
}
.steel {
  background-color: $steel
}
.fairy {
  background-color: $fairy
}

// Estilos de Loading
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 50px;
}

.pokeball-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #ff6b6b 50%, white 50%);
  border: 4px solid #333;
  animation: spin 0.8s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: white;
    border: 4px solid #333;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background: #333;
    transform: translateY(-50%);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
  font-family: 'Changa', sans-serif;
  font-weight: bold;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

// Transiciones de la tarjeta Pokémon - Mejoradas
.pokemon-card-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.pokemon-card-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.pokemon-card-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.85);
}

.pokemon-card-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.pokemon-card-enter-to,
.pokemon-card-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

// Animación de entrada mejorada para elementos individuales
.pokemonCard {
  animation: slideInUpImproved 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideInUpImproved {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Animaciones escalonadas mejoradas para las secciones
.pokemonCard .nameImage {
  animation: fadeInScaleImproved 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
}

.pokemonCard .type {
  animation: fadeInScaleImproved 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s both;
}

.pokemonCard .stats {
  animation: fadeInScaleImproved 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}

.pokemonCard .moves {
  animation: fadeInScaleImproved 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s both;
}

.pokemonCard .habitat {
  animation: fadeInScaleImproved 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

@keyframes fadeInScaleImproved {
  0% {
    opacity: 0;
    transform: translateY(25px) scale(0.9);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-3px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Efecto hover mejorado para el botón de búsqueda
.searchButton {
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1c8b0a;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(28, 139, 10, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Efecto hover para el botón de detalles
.detailsButton {
  &:hover {
    background-color: #e55a2b;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(229, 90, 43, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Estilos del Modal
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: $pokedex-red;
  color: white;
  border-radius: 15px 15px 0 0;

  h2 {
    margin: 0;
    text-transform: capitalize;
    font-family: 'Changa', sans-serif;
    font-size: 1.3rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }
  }
}

.modal-body {
  padding: 20px;
  
  .modal-section {
    margin-bottom: 20px;
    
    h3 {
      color: $pokedex-red;
      margin-bottom: 10px;
      font-family: 'Changa', sans-serif;
      font-size: 1.1rem;
    }
    
    p {
      margin: 5px 0;
      line-height: 1.5;
    }

    .abilities-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .ability-tag {
        background-color: rgba(63, 81, 181, 0.1);
        border: 1px solid #3f51b5;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.9rem;
        text-transform: capitalize;

        small {
          color: #ff6b35;
          font-weight: bold;
        }
      }
    }
  }
}

@media screen and (max-width: 820px) {

  .header {
    flex-direction: column;
    height: 120px;

    & .searchButton {
      width: 70%;
      margin-top: 10px;
    }
  }
  .pokemonCard {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 600px) {
  .header {
    font-size: 1rem;

    & input[type="text"] {
      font-size: 1rem;
    }

    & .searchButton {
      font-size: 1rem;
    }
  }

  .pokemonCard {
    & .stats, & .moves, & .habitat {
      width: 90%;
    }
  }
}

@media screen and (max-width: 400px) {
  .header {
    & label {
      text-align: center;
    }
  }
}
</style>
