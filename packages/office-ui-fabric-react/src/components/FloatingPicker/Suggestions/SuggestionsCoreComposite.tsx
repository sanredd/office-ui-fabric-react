import * as React from 'react';
import { css } from '../../../Utilities';
import { ISuggestionItemProps, SuggestionsItem, ISuggestionModel } from '../../../Pickers';
import { ISuggestionsCoreProps } from './Suggestions.types';
import * as stylesImport from './SuggestionsCore.scss';
import useIndex from './Hooks/useIndex';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export const SuggestionsCoreComposite = <T extends any>(props: ISuggestionsCoreProps<T>) => {
  const [currentIndex, setIndex] = React.useState(-1);
  let currentSuggestion: ISuggestionModel<any> | undefined;
  let _selectedElement: HTMLDivElement;
  let SuggestionsItemOfProperType: new (props: ISuggestionItemProps<T>) => SuggestionsItem<T> = SuggestionsItem;

  /**
   * Increments the selected suggestion index
   */
  const nextSuggestion = (): boolean => {
    const { suggestions } = props;

    if (suggestions && suggestions.length > 0) {
      if (currentIndex === -1) {
        setSelectedSuggestion(0);
        return true;
      } else if (currentIndex < suggestions.length - 1) {
        setSelectedSuggestion(currentIndex + 1);
        return true;
      } else if (props.shouldLoopSelection && currentIndex === suggestions.length - 1) {
        setSelectedSuggestion(0);
        return true;
      }
    }

    return false;
  };

  /**
   * Decrements the selected suggestion index
   */
  const previousSuggestion = (): boolean => {
    const { suggestions } = props;

    if (suggestions && suggestions.length > 0) {
      if (currentIndex === -1) {
        setSelectedSuggestion(suggestions.length - 1);
        return true;
      } else if (currentIndex > 0) {
        setSelectedSuggestion(currentIndex - 1);
        return true;
      } else if (props.shouldLoopSelection && currentIndex === 0) {
        setSelectedSuggestion(suggestions.length - 1);
        return true;
      }
    }

    return false;
  };

  // public get selectedElement(): HTMLDivElement | undefined {
  //   return this._selectedElement;
  // }

  const getCurrentItem = (): ISuggestionModel<T> => {
    return props.suggestions[currentIndex];
  };

  const getSuggestionAtIndex = (index: number): ISuggestionModel<T> => {
    return props.suggestions[index];
  };

  const hasSuggestionSelected = (): boolean => {
    return currentIndex !== -1 && currentIndex < props.suggestions.length;
  };

  const removeSuggestion = (index: number): void => {
    props.suggestions.splice(index, 1);
  };

  const deselectAllSuggestions = (): void => {
    if (currentIndex > -1 && props.suggestions[currentIndex]) {
      props.suggestions[currentIndex].selected = false;
      setIndex(-1);
    }
  };

  const setSelectedSuggestion = (index: number): void => {
    const { suggestions } = props;

    if (index > suggestions.length - 1 || index < 0) {
      setIndex(0);
      currentSuggestion!.selected = false;
      currentSuggestion = suggestions[0];
      currentSuggestion.selected = true;
    } else {
      if (currentIndex > -1 && suggestions[currentIndex]) {
        suggestions[currentIndex].selected = false;
      }
      suggestions[index].selected = true;
      setIndex(index);
      currentSuggestion = suggestions[index];
    }
  };

  React.useEffect(() => scrollSelected());

  const { onRenderSuggestion, suggestionsItemClassName, resultsMaximumNumber, showRemoveButtons, suggestionsContainerAriaLabel } = props;
  const TypedSuggestionsItem = SuggestionsItemOfProperType;
  let { suggestions } = props;
  // Set this to selected element
  // const selectedElement = React.createRef();

  if (resultsMaximumNumber) {
    suggestions = suggestions.slice(0, resultsMaximumNumber);
  }

  return (
    <div
      className={css('ms-Suggestions-container', styles.suggestionsContainer)}
      id="suggestion-list"
      role="list"
      aria-label={suggestionsContainerAriaLabel}
    >
      {suggestions.map((suggestion: ISuggestionModel<T>, index: number) => (
        <div
          ref={suggestion.selected || index === currentIndex ? '_selectedElement' : ''}
          // tslint:disable
          key={(suggestion.item as any)['key'] ? (suggestion.item as any)['key'] : index}
          // tslint:enable
          id={'sug-' + index}
          role="listitem"
          aria-label={suggestion.ariaLabel}
        >
          <TypedSuggestionsItem
            id={'sug-item' + index}
            suggestionModel={suggestion}
            // tslint:disable-next-line:no-any
            RenderSuggestion={onRenderSuggestion as any}
            onClick={_onClickTypedSuggestionsItem(suggestion.item, index)}
            className={suggestionsItemClassName}
            showRemoveButton={showRemoveButtons}
            onRemoveItem={_onRemoveTypedSuggestionsItem(suggestion.item, index)}
            isSelectedOverride={index === currentIndex}
          />
        </div>
      ))}
    </div>
  );

  // TODO get the element to scroll into view properly regardless of direction.
  const scrollSelected = (): void => {
    if (_selectedElement && _selectedElement.scrollIntoView !== undefined) {
      _selectedElement.scrollIntoView(false);
    }
  };

  const _onClickTypedSuggestionsItem = (item: T, index: number): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      props.onSuggestionClick(ev, item, index);
    };
  };

  const _onRemoveTypedSuggestionsItem = (item: T, index: number): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      const onSuggestionRemove = props.onSuggestionRemove!;
      onSuggestionRemove(ev, item, index);
      ev.stopPropagation();
    };
  };
};
