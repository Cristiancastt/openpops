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
declare class ContextMenu {
    private target;
    private menuItems;
    private mode;
    private targetNode;
    private menuItemsNode;
    private isOpened;
    constructor({ target, menuItems, mode }: ContextMenuOptions);
    private getTargetNode;
    private getMenuItemsNode;
    private createItemMarkup;
    private renderMenu;
    private closeMenu;
    init(): void;
}

export { ContextMenu, ContextMenu as default };
