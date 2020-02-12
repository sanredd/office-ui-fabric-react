import { ICalloutProps } from '../Callout';
import { IStyle } from '@uifabric/styling';

export interface IBaseFloatingSuggestionsProps<T> {
  onRemoveSuggestion?: (item: T) => void;
  onSuggestionSelected?: (item: T) => void;
  suggestionCalloutProps?: ICalloutProps;
  className?: string;
  targetElement?: HTMLInputElement | null;
  calloutWidth?: number;
  calloutProps?: ICalloutProps;
}

export interface IBaseFloatingSuggestionsStylesProps {}

export interface IBaseFloatingSuggestionsStyles {
  root: IStyle;
  callout: IStyle;
}
