import * as React from 'react';
import { IRefObject } from '@uifabric/utilities';
import { IBaseFloatingSuggestionsProps } from '../FloatingSuggestionsComposite';
import { ISelectedItemsListProps } from '../SelectedItemsList';
import { IFocusZoneProps, IInputProps, Autofill } from 'office-ui-fabric-react';

export interface IUnifiedPickerProps<T> {
  /**
   * Ref of teh component
   */
  componentRef?: IRefObject<any>;

  /**
   * ClassName for the picker
   */
  className?: string;

  /**
   * Component to render selected items
   * selectedItemsListProps will be passed as props to this component
   */
  onRenderSelectedItems: (props: ISelectedItemsListProps<T>) => JSX.Element;

  /**
   * Props to pass to SelectedItems component
   */
  selectedItemsListProps: ISelectedItemsListProps<T>;

  /**
   * Component to render floating suggestions
   * floatingSuggestionProps will be passed as props to this component
   */
  onRederFloatingSuggestions: (props: IBaseFloatingSuggestionsProps<T>) => JSX.Element;

  /**
   * Props to pass to floating suggestions component
   */
  floatingSuggestionProps: IBaseFloatingSuggestionsProps<T>;

  /**
   * Current query string to show in input component
   */
  currentRenderedQuerystring?: string;

  /**
   * Callback when input query string changes
   */
  onQueryStringChange?: (query: string) => void;

  /**
   * A callback for when the user put focus on the picker
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | Autofill>;

  /**
   * A callback for when the user moves the focus away from the picker
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | Autofill>;

  /**
   * Focus zone props
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * Autofill input native props
   * @defaultvalue undefined
   */
  inputProps?: IInputProps;

  /**
   * Header component
   */
  headerComponent?: JSX.Element;

  /**
   * On paste to input
   */
  onPaste?: (pastedValue: string, selectedItemsList: T[]) => void;
}
