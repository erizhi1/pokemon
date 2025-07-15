// helpers/uiUtils.js
// Utilidades para manejo de UI, transiciones y timing

/**
 * Crea una promesa que se resuelve despu�s de un tiempo determinado
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} - Promesa que se resuelve despu�s del tiempo especificado
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Tiempos de transici�n predefinidos para consistencia en la UI
 */
export const TRANSITION_TIMES = {
  CARD_EXIT: 200,
  LOADING_DISPLAY: 400,
  CARD_ENTRANCE: 30,
  MODAL_ENTRANCE: 0,
  MODAL_EXIT: 0
};

/**
 * Maneja la secuencia de transiciones para mostrar un nuevo Pok�mon
 * @param {Function} setLoading - Funci�n para establecer el estado de loading
 * @param {Function} setShowCard - Funci�n para mostrar/ocultar la tarjeta
 * @returns {Object} - Funciones para controlar las transiciones
 */
export const createTransitionController = (setLoading, setShowCard) => {
  return {
    /**
     * Inicia la secuencia de b�squeda (oculta tarjeta anterior, muestra loading)
     */
    startSearchSequence: async () => {
      setLoading(true);
      setShowCard(false);
      await delay(TRANSITION_TIMES.CARD_EXIT);
    },

    /**
     * Finaliza la secuencia de b�squeda exitosa (oculta loading, muestra nueva tarjeta)
     */
    finishSuccessSequence: async () => {
      await delay(TRANSITION_TIMES.LOADING_DISPLAY);
      setLoading(false);
      
      setTimeout(() => {
        setShowCard(true);
      }, TRANSITION_TIMES.CARD_ENTRANCE);
    },

    /**
     * Maneja el final de una b�squeda fallida (oculta loading y tarjeta)
     */
    handleErrorSequence: () => {
      setLoading(false);
      setShowCard(false);
    }
  };
};

/**
 * Utilidades para manipulaci�n del DOM y focus
 */
export const domUtils = {
  /**
   * Enfoca un elemento por su ID
   * @param {string} elementId - ID del elemento a enfocar
   */
  focusElement: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  },

  /**
   * Limpia el valor de un input
   * @param {string} inputId - ID del input a limpiar
   */
  clearInput: (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = '';
    }
  },

  /**
   * Hace scroll hacia un elemento
   * @param {string} elementId - ID del elemento
   * @param {Object} options - Opciones de scroll
   */
  scrollToElement: (elementId, options = { behavior: 'smooth' }) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView(options);
    }
  }
};

/**
 * Utilidades para validaci�n de datos
 */
export const validationUtils = {
  /**
   * Verifica si un string est� vac�o o solo contiene espacios
   * @param {string} str - String a validar
   * @returns {boolean} - true si est� vac�o
   */
  isEmpty: (str) => {
    return !str || str.trim().length === 0;
  },

  /**
   * Verifica si un string es un n�mero
   * @param {string} str - String a validar
   * @returns {boolean} - true si es num�rico
   */
  isNumeric: (str) => {
    return /^\d+$/.test(str);
  },

  /**
   * Verifica si un n�mero est� en un rango espec�fico
   * @param {number} num - N�mero a validar
   * @param {number} min - Valor m�nimo (inclusive)
   * @param {number} max - Valor m�ximo (inclusive)
   * @returns {boolean} - true si est� en rango
   */
  isInRange: (num, min, max) => {
    return num >= min && num <= max;
  }
};

/**
 * Constantes para el rango de Pok�mon v�lido
 */
export const POKEMON_CONSTANTS = {
  MIN_ID: 1,
  MAX_ID: 1025,
  DEFAULT_MOVES_LIMIT: 10
};

/**
 * Genera un ID aleatorio para elementos del DOM
 * @param {string} prefix - Prefijo para el ID
 * @returns {string} - ID �nico
 */
export const generateUniqueId = (prefix = 'element') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
