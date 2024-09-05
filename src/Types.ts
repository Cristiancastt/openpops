/**
 * Mapa de eventos para un elemento del menú.
 * Las claves son los nombres de eventos (por ejemplo, "click") y los valores son las funciones que manejarán esos eventos.
 * 
 * @typedef {Object} MenuItemEventMap
 * @property {(event: MouseEvent) => void} [key] - Función manejadora del evento de mouse para el elemento del menú.
 */
export type MenuItemEventMap = {
  [key: string]: (event: MouseEvent) => void;
};

/**
 * Interfaz que define un elemento del menú contextual.
 * 
 * @interface MenuItem
 * @property {string} content - El contenido HTML que se mostrará en el elemento del menú.
 * @property {"top" | "bottom" | "top-bottom"} [divider] - Opcional. Define si el elemento debe tener un divisor encima, debajo o en ambos lados.
 * @property {MenuItemEventMap} [events] - Opcional. Mapa de eventos que pueden ser asignados a un elemento del menú.
 * @property {string} [icon] - Opcional. Un string con el SVG que se mostrará como ícono al inicio del contenido.
 */
export interface MenuItem {
  content: string;
  divider?: "top" | "bottom" | "top-bottom";
  events?: MenuItemEventMap;
  icon?: string;
}


/**
 * Opciones para la configuración del menú contextual.
 * 
 * @interface ContextMenuOptions
 * @property {string} target - Selector CSS del elemento objetivo donde se activará el menú contextual.
 * @property {MenuItem[]} menuItems - Los elementos del menú que serán mostrados en el menú contextual.
 * @property {"dark" | "light"} [mode] - Opcional. Modo de color del menú contextual ("dark" por defecto, o "light").
 */
export interface ContextMenuOptions {
  target: string;
  menuItems: MenuItem[];
  mode?: "dark" | "light";
}
