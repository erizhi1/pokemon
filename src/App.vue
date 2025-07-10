<template>
  <header class="header">
    <label for="">
      Escribe el Pokemon que quieras buscar Por ID:
      <input type="text" name="" id="">
      <button>Buscar Pokemon</button>
    </label>
  </header>
  <main class="main">
   <section class="pokemonCard">
    <div class="nameImage">
      <h2 class="pokemonName">pikachu</h2>
      <img src="" alt="pikachu" >
    </div>
    <ul class="type">
      <h2>Tipo:</h2>
      <li>
        <span>Electrico</span>
      </li>
    </ul>
    <ul class="stats">
      <h2>Stats</h2>
      <li>
        <span></span>
      </li>
    </ul>
   </section>
  </main>
</template>
<script>
import { pokeapi } from "@/api/pokeaapi";
import { search } from "core-js/fn/symbol";
export default{
  name: "App",
  data() {
    return {
      pokemonData: {},
      pokemonID: '',
    }
  },
  methods: {
    async searchPokemon() {
      try {
        const response = await pokeapi.get(`/${this.pokemonID}`);
        this.pokemonData = response.data;
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }
  }
}

</script>
<style lang="scss">
</style>
