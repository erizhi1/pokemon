// helpers/usePokemonSearch.js
// Composable que maneja toda la lógica de búsqueda de Pokémon

import { ref } from 'vue';
import { 
  validatePokemonInput, 
  searchCompletePokemon, 
  formatPokemonName 
} from './pokemonService.js';
import { 
  showErrorAlert, 
  showPokemonFoundAlert 
} from './alertService.js';
import { 
  createTransitionController 
} from './uiUtils.js';

/**
 * Composable para manejar la búsqueda de Pokémon
 * @returns {Object} - Estado reactivo y métodos para buscar Pokémon
 */
export const usePokemonSearch = () => {
  // Estado reactivo
  const pokemonData = ref({});
  const pokemonSpecies = ref({});
  const pokemonID = ref('');
  const showModal = ref(false);
  const isLoading = ref(false);
  const showCard = ref(false);

  // Controlador de transiciones
  const transitionController = createTransitionController(
    (loading) => { isLoading.value = loading; },
    (show) => { showCard.value = show; }
  );

  /**
   * Función principal de búsqueda de Pokémon
   */
  const searchPokemon = async () => {
    const inputValue = pokemonID.value;

    // Validar input
    const validation = validatePokemonInput(inputValue);
    if (!validation.isValid) {
      showErrorAlert(validation.error, inputValue, validation.message);
      return;
    }

    try {
      // Iniciar secuencia de transición
      await transitionController.startSearchSequence();

      // Buscar Pokémon
      const { pokemon, species } = await searchCompletePokemon(validation.input);
      
      // Actualizar datos
      pokemonData.value = pokemon;
      pokemonSpecies.value = species;

      // Finalizar secuencia de éxito
      await transitionController.finishSuccessSequence();

      // Mostrar alerta de éxito
      const formattedName = formatPokemonName(pokemon.name);
      showPokemonFoundAlert(formattedName);

      // Limpiar campo de búsqueda
      pokemonID.value = '';

      // Log para debugging (opcional)
      console.log('Pokémon encontrado:', pokemon);
      console.log('Especies:', species);

      return pokemon;

    } catch (error) {
      // Manejar errores
      transitionController.handleErrorSequence();

      // Determinar tipo de error y mostrar alerta apropiada
      if (error.message.includes('no existe') || error.message.includes('404')) {
        showErrorAlert('NOT_FOUND', inputValue);
      } else {
        showErrorAlert('CONNECTION_ERROR', inputValue, error.message);
      }

      console.error('Error en búsqueda de Pokémon:', error);
    }
  };

  /**
   * Abre el modal de detalles
   */
  const openModal = () => {
    showModal.value = true;
  };

  /**
   * Cierra el modal de detalles
   */
  const closeModal = () => {
    showModal.value = false;
  };

  /**
   * Resetea todos los datos del Pokémon
   */
  const resetPokemonData = () => {
    pokemonData.value = {};
    pokemonSpecies.value = {};
    pokemonID.value = '';
    showModal.value = false;
    isLoading.value = false;
    showCard.value = false;
  };

  /**
   * Verifica si hay datos de Pokémon cargados
   */
  const hasPokemonData = () => {
    return Object.keys(pokemonData.value).length > 0;
  };

  // Retornar estado y métodos
  return {
    // Estado reactivo
    pokemonData,
    pokemonSpecies,
    pokemonID,
    showModal,
    isLoading,
    showCard,

    // Métodos
    searchPokemon,
    openModal,
    closeModal,
    resetPokemonData,
    hasPokemonData
  };
};
