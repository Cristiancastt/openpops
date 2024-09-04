type MenuItemEventMap = {
    [key: string]: (event: MouseEvent) => void;
  };
  
  interface MenuItem {
    content: string;
    divider?: "top" | "bottom" | "top-bottom";
    events?: MenuItemEventMap;
  }
  
  interface ContextMenuOptions {
    target: string;
    menuItems: MenuItem[];
    mode?: "dark" | "light";
  }
  
  export default class ContextMenu {
    private target: string;
    private menuItems: MenuItem[];
    private mode: "dark" | "light";
    private targetNode: NodeListOf<Element>;
    private menuItemsNode: HTMLLIElement[];
    private isOpened: boolean;
  
    constructor({ target, menuItems, mode = "dark" }: ContextMenuOptions) {
      this.target = target;
      this.menuItems = menuItems;
      this.mode = mode;
      this.targetNode = this.getTargetNode();
      this.menuItemsNode = this.getMenuItemsNode();
      this.isOpened = false;
    }
  
    private getTargetNode(): NodeListOf<Element> {
      const nodes = document.querySelectorAll(this.target);
  
      if (nodes.length !== 0) {
        return nodes;
      } else {
        console.error(`getTargetNode :: "${this.target}" target not found`);
        return document.querySelectorAll(""); // Devuelve un NodeList vacío
      }
    }
  
    private getMenuItemsNode(): HTMLLIElement[] {
      const nodes: HTMLLIElement[] = [];
  
      if (!this.menuItems) {
        console.error("getMenuItemsNode :: Please enter menu items");
        return nodes;
      }
  
      this.menuItems.forEach((data, index) => {
        const item = this.createItemMarkup(data);
        (item.firstChild as HTMLElement)?.setAttribute("style", `animation-delay: ${index * 0.08}s`);

        nodes.push(item);
      });
  
      return nodes;
    }
  
    private createItemMarkup(data: MenuItem): HTMLLIElement {
      const button = document.createElement("BUTTON") as HTMLButtonElement;
      const item = document.createElement("LI") as HTMLLIElement;
  
      button.innerHTML = data.content;
      button.classList.add("contextMenu-button");
      item.classList.add("contextMenu-item");
  
      if (data.divider) item.setAttribute("data-divider", data.divider);
      item.appendChild(button);
  
      if (data.events) {
        Object.entries(data.events).forEach(([key, value]) => {
            button.addEventListener(key as keyof HTMLElementEventMap, value as EventListener);
          });
          
      }
  
      return item;
    }
  
    private renderMenu(): HTMLUListElement {
      const menuContainer = document.createElement("UL") as HTMLUListElement;
  
      menuContainer.classList.add("contextMenu");
      menuContainer.setAttribute("data-theme", this.mode);
  
      this.menuItemsNode.forEach((item) => menuContainer.appendChild(item));
  
      return menuContainer;
    }
  
    private closeMenu(menu: HTMLUListElement): void {
      if (this.isOpened) {
        this.isOpened = false;
        menu.remove();
      }
    }
  
    public init(): void {
    const contextMenu = this.renderMenu();
    document.addEventListener("click", () => this.closeMenu(contextMenu));
    window.addEventListener("blur", () => this.closeMenu(contextMenu));
    document.addEventListener("contextmenu", (e: MouseEvent) => {
      this.targetNode.forEach((target) => {
        if (!e.target || !target.contains(e.target as Node)) {
          contextMenu.remove();
        }
      });
    });

    this.targetNode.forEach((target) => {
        target.addEventListener("contextmenu", (e: Event) => {
          e.preventDefault();
          this.isOpened = true;
      
          const { clientX, clientY } = e as MouseEvent;
          document.body.appendChild(contextMenu);

        const positionY =
          clientY + contextMenu.scrollHeight >= window.innerHeight
            ? window.innerHeight - contextMenu.scrollHeight - 20
            : clientY;
        const positionX =
          clientX + contextMenu.scrollWidth >= window.innerWidth
            ? window.innerWidth - contextMenu.scrollWidth - 20
            : clientX;

        contextMenu.setAttribute(
          "style",
          `--width: ${contextMenu.scrollWidth}px;
           --height: ${contextMenu.scrollHeight}px;
           --top: ${positionY}px;
           --left: ${positionX}px;`
        );
      });
    });
  }
  }
  