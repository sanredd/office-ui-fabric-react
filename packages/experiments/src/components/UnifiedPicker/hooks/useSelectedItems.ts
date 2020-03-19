import * as React from 'react';
import { Selection } from '../../../Utilities';

export interface IUseSelectedItemsResponse<T> {
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  addItems: (items: T[]) => void;
  removeItemAt: (index: number) => void;
  removeItem: (item: T) => void;
  replaceItem: (itemToReplace: T, itemsToReplaceWith: T[]) => void;
  removeItems: (itemsToRemove: T[]) => void;
  removeSelectedItems: () => void;
  getSelectedItems: () => T[];
  hasSelectedItems: () => boolean;
  unselectAll: () => void;
  selectAll: () => void;
}

export const useSelectedItems = <T extends {}>(selection: Selection, selectedItems?: T[]): IUseSelectedItemsResponse<T> => {
  const [items, setSelectedItems] = React.useState(selectedItems || []);

  const addItems = (itemsToAdd: T[]): void => {
    const newItems: T[] = items.concat(itemsToAdd);
    setSelectedItems(newItems);
  };

  const removeItemAt = (index: number): void => {
    const currentItems: T[] = [...items];
    const updatedItems: T[] = currentItems.slice(0, index).concat(currentItems.slice(index + 1));
    setSelectedItems(updatedItems);
  };

  const removeItem = (item: T): void => {
    const currentItems: T[] = [...items];
    const index: number = currentItems.indexOf(item);
    removeItemAt(index);
  };

  const replaceItem = (itemToReplace: T, itemsToReplaceWith: T[]): void => {
    const currentItems: T[] = [...items];
    const index: number = items.indexOf(itemToReplace);

    if (index > -1) {
      const updatedItems = currentItems
        .slice(0, index)
        .concat(itemsToReplaceWith)
        .concat(currentItems.slice(index + 1));
      setSelectedItems(updatedItems);
    }
  };

  const removeItems = (itemsToRemove: any[]): void => {
    const currentitems: T[] = [...items];
    const updatedItems: T[] = currentitems.filter(item => itemsToRemove.indexOf(item) === -1);

    setSelectedItems(updatedItems);
  };

  const removeSelectedItems = (): void => {
    removeItems(getSelectedItems());
  };

  const getSelectedItems = (): T[] => {
    if (hasSelectedItems()) {
      return selection.getSelection() as T[];
    } else {
      return [];
    }
  };

  const hasSelectedItems = (): Boolean => {
    if (items.length && selection.getSelectedCount() > 0) {
      return true;
    } else {
      return false;
    }
  };

  const unselectAll = (): void => {
    if (hasSelectedItems()) {
      selection.setAllSelected(false);
    }
  };

  const selectAll = (): void => {
    selection.setAllSelected(true);
  };

  return {
    selectedItems: items,
    setSelectedItems: setSelectedItems,
    addItems: addItems,
    removeItemAt: removeItemAt,
    removeItem: removeItem,
    replaceItem: replaceItem,
    removeItems: removeItems,
    removeSelectedItems: removeSelectedItems,
    getSelectedItems: getSelectedItems,
    hasSelectedItems: hasSelectedItems,
    unselectAll: unselectAll
  } as IUseSelectedItemsResponse<T>;
};
