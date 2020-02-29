import * as React from 'react';
import {
  IFloatingSuggestionItemStylesProps,
  IFloatingSuggestionItemStyles,
  IFloatingSuggestionItemProps,
  IFloatingSuggestionOnRenderItemProps
} from './FloatingSuggestionsItem.types';
import { classNamesFunction, css } from '../../../Utilities';
import { getStyles } from './FloatingSuggestionsItem.styles';
import { CommandButton, IconButton } from 'office-ui-fabric-react/lib/Button';

export const FloatingSuggestionsItem = <T extends {}>(props: IFloatingSuggestionItemProps<T>): JSX.Element => {
  const { id, onClick, className, onRemoveItem, onRenderSuggestion, showRemoveButton, removeButtonAriaLabel, isSelected } = props;
  const getClassNames = classNamesFunction<IFloatingSuggestionItemStylesProps, IFloatingSuggestionItemStyles>();
  const classNames = getClassNames(getStyles, { isSelected: isSelected });

  const onClickItem = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    onClick ? onClick(ev, props) : null;
    ev.stopPropagation();
  };

  const onRemove = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    onRemoveItem ? onRemoveItem(ev, props) : null;
    ev.stopPropagation();
  };

  return (
    <div className={css(classNames.root, className ? className : '')}>
      <CommandButton onClick={onClickItem} className={classNames.itemButton}>
        {onRenderSuggestion ? (
          onRenderSuggestion(props as IFloatingSuggestionOnRenderItemProps<T>)
        ) : (
          <div className={classNames.displayText}>{props.displayText}</div>
        )}
      </CommandButton>
      {showRemoveButton ? (
        <IconButton
          iconProps={{ iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }}
          title={removeButtonAriaLabel}
          ariaLabel={removeButtonAriaLabel}
          onClick={onRemove}
          className={classNames.closeButton}
        />
      ) : null}
    </div>
  );
};

export const FloatingSuggestionsItemMemo = React.memo<IFloatingSuggestionItemProps<T>>(FloatingSuggestionsItem, (prevProps, nextProp) => {
  if (
    prevProps.isSelected !== nextProp.isSelected ||
    prevProps.id !== nextProp.id ||
    prevProps.item !== nextProp.item ||
    prevProps.displayText !== nextProp.displayText ||
    prevProps.showRemoveButton !== nextProp.showRemoveButton
  ) {
    return false;
  }
  return true;
});
