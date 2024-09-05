import { MenuItem, ContextMenuOptions } from "./Types";

/**
 * Clase que representa un menú contextual.
 * @class
 */
export default class Openpop {
  /**
   * El selector CSS del objetivo donde se activará el menú contextual.
   * @private
   * @readonly
   * @type {string}
   */
  private readonly target: string;

  /**
   * Los elementos del menú contextual.
   * @private
   * @readonly
   * @type {MenuItem[]}
   */
  private readonly menuItems: MenuItem[];

  /**
   * El modo de visualización del menú contextual (oscuro o claro).
   * @private
   * @readonly
   * @type {"dark" | "light"}
   */
  private readonly mode: "dark" | "light";

  /**
   * Los nodos del DOM que coinciden con el objetivo.
   * @private
   * @readonly
   * @type {Element[]}
   */
  private readonly targetNodes: Element[];

  /**
   * El elemento HTML del menú contextual.
   * @private
   * @type {HTMLUListElement | null}
   */
  private menuElement: HTMLUListElement | null = null;

  /**
   * Indica si el menú contextual está abierto.
   * @private
   * @type {boolean}
   */
  private isOpen = false;

  /**
   * Constructor de la clase ContextMenu.
   * @param {ContextMenuOptions} options - Opciones para configurar el menú contextual.
   */
  constructor({ target, menuItems, mode = "dark" }: ContextMenuOptions) {
    this.target = target;
    this.menuItems = menuItems;
    this.mode = mode;
    this.targetNodes = this.getTargetNodes();
  }

  /**
   * Obtiene los nodos del DOM que coinciden con el selector del objetivo.
   * @private
   * @returns {Element[]} Los nodos del DOM que coinciden con el selector.
   */
  private getTargetNodes(): Element[] {
    const nodes = Array.from(document.querySelectorAll(this.target));
    if (nodes.length === 0) {
      console.error(`Target "${this.target}" no encontrado`);
    }
    return nodes;
  }

  /**
 * Crea el elemento HTML para el menú contextual.
 * @private
 * @returns {HTMLUListElement} El elemento UL del menú contextual.
 */
private createMenuElement(): HTMLUListElement {
    const menu = document.createElement("ul");
    menu.className = "contextMenu";
    menu.dataset.theme = this.mode;
  
    this.menuItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "contextMenu-item";
      if (item.divider) li.dataset.divider = item.divider;
  
      const button = document.createElement("button");
      button.className = "contextMenu-button";
      button.style.animationDelay = `${index * 0.08}s`;
  
      if (item.icon) {
        const iconSpan = document.createElement("div");
        iconSpan.className = "contextMenu-icon";
        iconSpan.innerHTML = item.icon;
        button.appendChild(iconSpan);
      }

      const contentSpan = document.createElement("div");
      contentSpan.className = "contextMenu-content";
      contentSpan.innerHTML = item.content;
      button.appendChild(contentSpan);
  
      if (item.events) {
        Object.entries(item.events).forEach(([event, handler]) => {
          button.addEventListener(event as keyof HTMLElementEventMap, handler as EventListener);
        });
      }
  
      li.appendChild(button);
      menu.appendChild(li);
    });
  
    return menu;
  }
  
  /**
   * Posiciona el menú contextual en función de la ubicación del clic.
   * @private
   * @param {MouseEvent} e - El evento de clic derecho que activa el menú.
   */
  private positionMenu(e: MouseEvent): void {
    if (!this.menuElement) return;

    const { clientX, clientY } = e;
    const { scrollWidth, scrollHeight } = this.menuElement;
    const { innerWidth, innerHeight } = window;

    const posX = Math.min(clientX, innerWidth - scrollWidth - 20);
    const posY = Math.min(clientY, innerHeight - scrollHeight - 20);

    this.menuElement.style.setProperty("--width", `${scrollWidth}px`);
    this.menuElement.style.setProperty("--height", `${scrollHeight}px`);
    this.menuElement.style.setProperty("--top", `${posY}px`);
    this.menuElement.style.setProperty("--left", `${posX}px`);
  }

  /**
   * Cierra el menú contextual.
   * @private
   */
  private closeMenu = (): void => {
    if (this.isOpen && this.menuElement) {
      this.isOpen = false;
      this.menuElement.remove();
      this.menuElement = null;
    }
  };

  /**
   * Maneja el evento de clic derecho y muestra el menú contextual.
   * @private
   * @param {MouseEvent} e - El evento de clic derecho.
   */
  private handleContextMenu = (e: MouseEvent): void => {
    e.preventDefault();
    this.closeMenu();

    this.isOpen = true;
    this.menuElement = this.createMenuElement();
    document.body.appendChild(this.menuElement);
    this.positionMenu(e);
  };

  /**
   * Inicializa el menú contextual, añadiendo los eventos correspondientes.
   * @public
   */
  public init(): void {
    if (!this.menuItems || this.menuItems.length === 0) {
      console.error("Por favor, proporciona elementos del menú");
      return;
    }

    document.addEventListener("click", this.closeMenu);
    window.addEventListener("blur", this.closeMenu);
    document.addEventListener("contextmenu", (e) => {
      if (!this.targetNodes.some(node => node.contains(e.target as Node))) {
        this.closeMenu();
      }
    });

    this.targetNodes.forEach(node => {
      node.addEventListener("contextmenu", this.handleContextMenu as EventListener);
    });
  }

  /**
   * Destruye el menú contextual, eliminando los eventos correspondientes.
   * @public
   */
  public destroy(): void {
    document.removeEventListener("click", this.closeMenu);
    window.removeEventListener("blur", this.closeMenu);
    this.targetNodes.forEach(node => {
      node.removeEventListener("contextmenu", this.handleContextMenu as EventListener);
    });
    this.closeMenu();
  }
}
