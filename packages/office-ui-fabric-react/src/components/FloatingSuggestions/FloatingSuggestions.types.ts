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
  onRenderSuggestion?: (renderProps: IFloatingSuggestionOnRenderItemProps<T>) => JSX.Element;
  onRemoveSuggestion?: (ev: React.MouseEvent<HTMLElement>, item: any) => void;
  onSuggestionSelected?: (ev: React.MouseEvent<HTMLElement>, item: any) => void;
  onRenderHeader?: (suggestionItems?: IFloatingSuggestionItemProps<T>[], suggestionsHeaderText?: string) => JSX.Element;
  onRenderFooter?: (suggestionItems?: IFloatingSuggestionItemProps<T>[]) => JSX.Element;
  showSuggestionRemoveButton?: boolean;
  className?: string;
  targetElement: HTMLInputElement | null;
  calloutWidth?: number;
  calloutProps?: ICalloutProps;
  isSuggestionsVisible?: boolean;
  suggestionListClassName?: string;
  suggestionsItemClassName?: string;
  suggestionsHeaderText?: string;
  suggestionCalloutProps?: ICalloutProps;
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
