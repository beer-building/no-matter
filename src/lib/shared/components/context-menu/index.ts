import ContextMenuComponent from "./ContextMenu.svelte";
import Item from "./Item.svelte";

type _ContextMenu = typeof ContextMenuComponent & {
	Item: typeof Item;
};

const ContextMenu: _ContextMenu = ContextMenuComponent as _ContextMenu;
ContextMenu.Item = Item;

export { ContextMenu };
