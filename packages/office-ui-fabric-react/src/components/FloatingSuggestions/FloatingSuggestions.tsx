import { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';
import { Callout, DirectionalHint } from '../Callout';
import React = require('react');
import { getStyles } from './FloatingSuggestions.styles';
import { classNamesFunction, css } from '../../Utilities';
import { IBaseFloatingSuggestionsStyles, IBaseFloatingSuggestionsStylesProps } from './FloatingSuggestions.types';
import { FloatingSuggestionsList } from './FloatingSuggestionsList/FloatingSuggestionsList';

export const BaseFloatingSuggestions = <T extends {}>(props: IBaseFloatingSuggestionsProps<T>): JSX.Element | null => {
  const getClassNames = classNamesFunction<IBaseFloatingSuggestionsStylesProps, IBaseFloatingSuggestionsStyles>();
  const classNames = getClassNames(getStyles);
  const {
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
    suggestionsContainerAriaLabel
  } = props;

  const hidePicker = (): void => {
    alert('on dismiss called');
  };

  return (
    <div className={css('ms-BasePicker ms-BaseFloatingPicker', classNames.root, props.className ? props.className : '')}>
      {props.isSuggestionsVisible ? (
        <Callout
          className={classNames.callout}
          isBeakVisible={false}
          gapSpace={5}
          target={props.targetElement}
          onDismiss={hidePicker}
          directionalHint={DirectionalHint.bottomLeftEdge}
          directionalHintForRTL={DirectionalHint.bottomRightEdge}
          calloutWidth={props.calloutWidth ? props.calloutWidth : 0}
          {...props.calloutProps}
        >
          <FloatingSuggestionsList
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
          />
        </Callout>
      ) : null}
    </div>
  );
};
