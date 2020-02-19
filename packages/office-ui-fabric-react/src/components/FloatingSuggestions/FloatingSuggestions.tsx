import { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';
import { Callout, DirectionalHint } from '../Callout';
import * as React from 'react';
import { getStyles } from './FloatingSuggestions.styles';
import { classNamesFunction, css } from '../../Utilities';
import { IBaseFloatingSuggestionsStyles, IBaseFloatingSuggestionsStylesProps } from './FloatingSuggestions.types';
import { FloatingSuggestionsList } from './FloatingSuggestionsList/FloatingSuggestionsList';

export const BaseFloatingSuggestions = <T extends {}>(props: IBaseFloatingSuggestionsProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IBaseFloatingSuggestionsStylesProps, IBaseFloatingSuggestionsStyles>();
  const classNames = getClassNames(getStyles);
  const {
    componentRef,
    suggestions,
    onSuggestionSelected,
    onRemoveSuggestion,
    onRenderSuggestion,
    onRenderHeader,
    onRenderFooter,
    onRenderNoResultFound,
    noResultsFoundText,
    maximumSuggestionsToShow,
    showSuggestionRemoveButton,
    removeItemButtonAriaLabel,
    suggestionsContainerAriaLabel,
    selectedSuggestionIndex,
    suggestionsHeaderText,
    onFloatingSuggestionsDismiss
  } = props;

  const hidePicker = (ev: React.MouseEvent): void => {
    onFloatingSuggestionsDismiss ? onFloatingSuggestionsDismiss(ev) : null;
  };

  return (
    <div ref={componentRef} className={css('ms-BasePicker ms-BaseFloatingPicker', classNames.root, props.className ? props.className : '')}>
      {props.isSuggestionsVisible ? (
        <Callout
          className={classNames.callout}
          isBeakVisible={false}
          gapSpace={5}
          target={props.targetElement}
          onDismiss={hidePicker}
          directionalHint={DirectionalHint.bottomLeftEdge}
          directionalHintForRTL={DirectionalHint.bottomRightEdge}
          {...props.calloutProps}
        >
          <FloatingSuggestionsList<T>
            suggestionItems={suggestions}
            onItemClick={onSuggestionSelected}
            onSuggestionRemove={onRemoveSuggestion}
            showSuggestionRemoveButton={showSuggestionRemoveButton}
            removeItemAriaLabel={removeItemButtonAriaLabel}
            onRenderItem={onRenderSuggestion}
            onRenderHeader={onRenderHeader}
            onRenderFooter={onRenderFooter}
            onRenderNoResultFound={onRenderNoResultFound}
            noResultsFoundText={noResultsFoundText}
            maximumSuggestionsToShow={maximumSuggestionsToShow}
            suggestionsContainerAriaLabel={suggestionsContainerAriaLabel}
            selectedSuggestionIndex={selectedSuggestionIndex ? selectedSuggestionIndex : 0}
            suggestionsHeaderText={suggestionsHeaderText}
          />
        </Callout>
      ) : null}
    </div>
  );
};
