import { ICalloutProps } from '../Callout';
import { IStyle } from '@uifabric/styling';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionOnRenderItemProps
} from './FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import { IRenderFunction, IRefObject } from '@uifabric/utilities';

export interface IBaseFloatingSuggestionsProps<T> {
  componentRef?: IRefObject<HTMLDivElement>;
  suggestions: IFloatingSuggestionItemProps<T>[];
  isSuggestionsVisible: boolean;
  onRenderSuggestion?: (renderProps: IFloatingSuggestionOnRenderItemProps<T>) => JSX.Element;
  onRemoveSuggestion?: (ev: React.MouseEvent<HTMLElement>, item: any) => void;
  onSuggestionSelected?: (ev: React.MouseEvent<HTMLElement>, item: any) => void;
  onRenderHeader?: (suggestionItems?: IFloatingSuggestionItemProps<T>[], suggestionsHeaderText?: string) => JSX.Element;
  onRenderFooter?: (suggestionItems?: IFloatingSuggestionItemProps<T>[]) => JSX.Element;
  onFloatingSuggestionsDismiss?: (ev?: React.MouseEvent) => void;
  showSuggestionRemoveButton?: boolean;
  className?: string;
  targetElement: HTMLInputElement | null;
  calloutWidth?: number;
  calloutProps?: ICalloutProps;
  suggestionListClassName?: string;
  suggestionsItemClassName?: string;
  suggestionsHeaderText?: string;
  onRenderNoResultFound?: IRenderFunction<void>;
  noResultsFoundText?: string;
  maximumSuggestionsToShow?: number;
  suggestionsContainerAriaLabel?: string;
  suggestionListAriaLabel?: string;
  removeItemButtonAriaLabel?: string;
  selectedSuggestionIndex?: number;
}

export interface IBaseFloatingSuggestionsStylesProps {}

export interface IBaseFloatingSuggestionsStyles {
  root: IStyle;
  callout: IStyle;
}
