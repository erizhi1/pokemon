// helpers/pokemonService.js
// Servicio para manejar todas las operaciones relacionadas con la PokéAPI

import { pokeapi } from "@/api/pokeapi";

/**
 * Valida el input del usuario para búsqueda de Pokémon
 * @param {string} pokemonInput - El input del usuario
 * @returns {Object} - Objeto con isValid, error y pokemonNumber (si aplica)
 */
export const validatePokemonInput = (pokemonInput) => {
  if (!pokemonInput.trim()) {
    return {
      isValid: false,
      error: 'EMPTY_FIELD',
      message: 'Por favor, ingresa un nombre o ID de Pokémon'
    };
  }

  const trimmedInput = pokemonInput.trim();
  const isNumeric = /^\d+$/.test(trimmedInput);
  
  if (isNumeric) {
    const pokemonNumber = parseInt(trimmedInput);
    if (pokemonNumber < 1 || pokemonNumber > 1025) {
      return {
        isValid: false,
        error: 'OUT_OF_RANGE',
        message: 'ID de Pokémon fuera de rango válido (1-1025)'
      };
    }
    return {
      isValid: true,
      pokemonNumber,
      input: trimmedInput
    };
  }

  return {
    isValid: true,
    input: trimmedInput
  };
};

/**
 * Busca un Pokémon en la PokéAPI
 * @param {string} pokemonIdentifier - Nombre o ID del Pokémon
 * @returns {Promise<Object>} - Datos del Pokémon
 */
export const fetchPokemon = async (pokemonIdentifier) => {
  try {
    const response = await fetch(`${pokeapi}${pokemonIdentifier.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`El Pokémon "${pokemonIdentifier}" no existe. Verifica el nombre o ID.`);
      } else {
        throw new Error(`Error de conexión (${response.status}). Inténtalo de nuevo.`);
      }
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Busca información de la especie del Pokémon
 * @param {string} speciesUrl - URL de la especie desde la respuesta del Pokémon
 * @returns {Promise<Object>} - Datos de la especie
 */
export const fetchPokemonSpecies = async (speciesUrl) => {
  try {
    const response = await fetch(speciesUrl);
    
    if (!response.ok) {
      throw new Error(`Error al obtener información de la especie (${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Función principal para buscar un Pokémon completo (datos + especie)
 * @param {string} pokemonIdentifier - Nombre o ID del Pokémon
 * @returns {Promise<Object>} - Objeto con pokemon y species
 */
export const searchCompletePokemon = async (pokemonIdentifier) => {
  try {
    // Buscar datos básicos del Pokémon
    const pokemon = await fetchPokemon(pokemonIdentifier);
    
    // Buscar información de la especie
    const species = await fetchPokemonSpecies(pokemon.species.url);
    
    return {
      pokemon,
      species
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Formatea el nombre del Pokémon para mostrar
 * @param {string} name - Nombre del Pokémon
 * @returns {string} - Nombre formateado con primera letra mayúscula
 */
export const formatPokemonName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * Convierte la altura del Pokémon de decímetros a metros
 * @param {number} height - Altura en decímetros
 * @returns {string} - Altura formateada en metros
 */
export const formatHeight = (height) => {
  return (height / 10).toFixed(1);
};

/**
 * Convierte el peso del Pokémon de hectogramos a kilogramos
 * @param {number} weight - Peso en hectogramos
 * @returns {string} - Peso formateado en kilogramos
 */
export const formatWeight = (weight) => {
  return (weight / 10).toFixed(1);
};

/**
 * Formatea el ID del Pokémon con ceros a la izquierda
 * @param {number} id - ID del Pokémon
 * @returns {string} - ID formateado con 3 dígitos
 */
export const formatPokemonId = (id) => {
  return id.toString().padStart(3, '0');
};
