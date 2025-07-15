// helpers/alertService.js
// Servicio para manejar todas las alertas con SweetAlert2

import Swal from 'sweetalert2';

/**
 * Configuración base para las alertas
 */
const alertConfig = {
  confirmButtonColor: '#ff6b35',
  background: '#fff',
  color: '#333'
};

/**
 * Muestra una alerta de campo vacío
 */
export const showEmptyFieldAlert = () => {
  return Swal.fire({
    icon: 'warning',
    title: '¡Campo vacío!',
    text: 'Por favor, ingresa un nombre o ID de Pokémon',
    confirmButtonText: 'Entendido',
    ...alertConfig
  });
};

/**
 * Muestra una alerta de fuera de rango
 */
export const showOutOfRangeAlert = () => {
  return Swal.fire({
    icon: 'error',
    title: '¡Fuera de rango!',
    html: `
      <p>ID de Pokémon fuera de rango válido.</p>
      <br>
      <strong>🎯 Rango permitido:</strong> 1 - 1025
      <br><br>
      <em>💡 También puedes usar el nombre del Pokémon</em>
    `,
    confirmButtonText: 'Intentar de nuevo',
    confirmButtonColor: '#e74c3c',
    background: '#fff',
    color: '#333'
  });
};

/**
 * Muestra una alerta de éxito cuando se encuentra un Pokémon
 * @param {string} pokemonName - Nombre del Pokémon encontrado
 */
export const showPokemonFoundAlert = (pokemonName) => {
  return Swal.fire({
    icon: 'success',
    title: '¡Pokémon encontrado!',
    text: `${pokemonName} cargado exitosamente`,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    background: '#d4edda',
    color: '#155724'
  });
};

/**
 * Muestra una alerta de Pokémon no encontrado
 * @param {string} pokemonInput - El input que no se encontró
 */
export const showPokemonNotFoundAlert = (pokemonInput) => {
  return Swal.fire({
    icon: 'error',
    title: '¡Pokémon no encontrado!',
    html: `
      <p><strong>"${pokemonInput}"</strong> no existe en la Pokédex.</p>
      <br>
      <div style="text-align: left; margin: 0 auto; display: inline-block;">
        <strong>💡 Sugerencias:</strong><br>
        • Verifica la ortografía del nombre<br>
        • Usa nombres en inglés (ej: pikachu, charizard)<br>
        • Prueba con un ID válido (1-1025)<br>
        • Revisa que no tenga espacios extra
      </div>
    `,
    confirmButtonText: 'Intentar de nuevo',
    confirmButtonColor: '#e74c3c',
    background: '#fff',
    color: '#333',
    width: '500px'
  });
};

/**
 * Muestra una alerta de error de conexión
 * @param {string} errorMessage - Mensaje de error
 */
export const showConnectionErrorAlert = (errorMessage) => {
  return Swal.fire({
    icon: 'error',
    title: '¡Error de conexión!',
    text: errorMessage,
    confirmButtonText: 'Reintentar',
    confirmButtonColor: '#f39c12',
    background: '#fff',
    color: '#333'
  });
};

/**
 * Muestra la alerta apropiada basada en el tipo de error
 * @param {string} errorType - Tipo de error
 * @param {string} pokemonInput - Input del usuario (opcional)
 * @param {string} errorMessage - Mensaje de error personalizado (opcional)
 */
export const showErrorAlert = (errorType, pokemonInput = '', errorMessage = '') => {
  switch (errorType) {
    case 'EMPTY_FIELD':
      return showEmptyFieldAlert();
    
    case 'OUT_OF_RANGE':
      return showOutOfRangeAlert();
    
    case 'NOT_FOUND':
      return showPokemonNotFoundAlert(pokemonInput);
    
    case 'CONNECTION_ERROR':
      return showConnectionErrorAlert(errorMessage);
    
    default:
      return showConnectionErrorAlert('Error desconocido');
  }
};
