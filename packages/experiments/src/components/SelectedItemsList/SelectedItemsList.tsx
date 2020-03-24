import * as React from 'react';

import { ISelectedItemsList, ISelectedItemsListProps, BaseSelectedItem } from './SelectedItemsList.types';

const _SelectedItemsList = <TItem extends BaseSelectedItem>(
  props: ISelectedItemsListProps<TItem>,
  ref: React.Ref<ISelectedItemsList<TItem>>
) => {
  const [items, updateItems] = React.useState(props.selectedItems || []);
  const renderedItems = React.useMemo(() => items, [items]);

  React.useEffect(() => {
    updateItems(props.selectedItems || []);
  }, [props.selectedItems]);

  const removeItems = (itemsToRemove: TItem[]): void => {
    updateItems(items.filter(item => itemsToRemove.indexOf(item) === -1));
    props.onItemsRemoved ? props.onItemsRemoved(itemsToRemove) : null;
  };

  const replaceItem = React.useCallback(
    (newItem: TItem | TItem[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: TItem[] = [...items];
        newItems.splice(index, 1, ...newItemsArray);
        updateItems(newItems);
      }
    },
    [updateItems, items]
  );

  const onRemoveItemCallbacks = React.useMemo(
    () =>
      // create callbacks ahead of time with memo.
      // (hooks have to be called in the same order)
      items.map((item: TItem) => () => removeItems([item])),
    [items]
  );

  const SelectedItem = props.onRenderItem;
  return (
    <>
      {renderedItems.map((item: TItem, index: number) => (
        <SelectedItem
          item={item}
          index={index}
          key={item.key !== undefined ? item.key : index}
          selected={false}
          removeButtonAriaLabel={props.removeButtonAriaLabel}
          onRemoveItem={onRemoveItemCallbacks[index]}
          onItemChange={replaceItem}
        />
      ))}
    </>
  );
};

// Typescript only respects unifying a generic type with a generic const _function_ of the same name for function types.
// In order to satisfy the type checker, here we lie about the type of the const so that it is still a generic function.
export type SelectedItemsList<TItem extends BaseSelectedItem> = React.Component<ISelectedItemsListProps<TItem>>;
export const SelectedItemsList = React.forwardRef(_SelectedItemsList) as typeof _SelectedItemsList;
