import { ITheme, IStyle } from '@uifabric/styling';

export interface IFloatingSuggestionItemProps<T> {
  item: T;
  isSelected: boolean;
  onClick?: (ev: React.MouseEvent<HTMLElement>, item: T) => void;
  onRemoveItem?: (ev: React.MouseEvent<HTMLElement>, item: T) => void;
  displayText?: string;
  className?: string;
  showRemoveButton?: boolean;
  ariaLabel?: string;
  removeButtonAriaLabel?: string;
  key?: string | number;
  id?: string;
  theme?: ITheme;
  onRenderSuggestion?: (renderProps: IFloatingSuggestionOnRenderItemProps<T>) => JSX.Element;
}

export type IFloatingSuggestionOnClickItemProps<T> = Pick<IFloatingSuggestionItemProps<T>, 'item' | 'isSelected' | 'key' | 'id'>;

export type IFloatingSuggestionOnRenderItemProps<T> = Omit<IFloatingSuggestionItemProps<T>, 'onRenderSuggestion'>;

export interface IFloatingSuggestionItemStylesProps {
  isSelected?: boolean;
}

export interface IFloatingSuggestionItemStyles {
  root: IStyle;
  itemButton: IStyle;
  closeButton: IStyle;
  displayText: IStyle;
}
