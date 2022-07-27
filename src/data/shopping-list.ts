import { ThirdEye } from "../types";

export interface ShoppingListItem {
  id: number;
  name: string;
  complete: boolean;
}

export const fetchItems = (hass: ThirdEye): Promise<ShoppingListItem[]> =>
  hass.callWS({
    type: "shopping_list/items",
  });

export const updateItem = (
  hass: ThirdEye,
  itemId: number,
  item: {
    name?: string;
    complete?: boolean;
  }
): Promise<ShoppingListItem> =>
  hass.callWS({
    type: "shopping_list/items/update",
    item_id: itemId,
    ...item,
  });

export const clearItems = (hass: ThirdEye): Promise<void> =>
  hass.callWS({
    type: "shopping_list/items/clear",
  });

export const addItem = (
  hass: ThirdEye,
  name: string
): Promise<ShoppingListItem> =>
  hass.callWS({
    type: "shopping_list/items/add",
    name,
  });

export const reorderItems = (
  hass: ThirdEye,
  itemIds: [string]
): Promise<ShoppingListItem> =>
  hass.callWS({
    type: "shopping_list/items/reorder",
    item_ids: itemIds,
  });
