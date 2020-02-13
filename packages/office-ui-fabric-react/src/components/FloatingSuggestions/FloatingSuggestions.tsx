import { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';
import { Callout, DirectionalHint } from '../Callout';
import React = require('react');
import { getStyles } from './FloatingSuggestions.styles';
import { classNamesFunction, css } from '../../Utilities';
import { IBaseFloatingSuggestionsStyles, IBaseFloatingSuggestionsStylesProps } from './FloatingSuggestions.types';

export const BaseFloatingSuggestions = <T extends {}>(props: IBaseFloatingSuggestionsProps<T>): JSX.Element | null => {
  const getClassNames = classNamesFunction<IBaseFloatingSuggestionsStylesProps, IBaseFloatingSuggestionsStyles>();
  const classNames = getClassNames(getStyles);

  const hidePicker = (): void => {
    alert('on dismiss called');
  };

  return (
    <div className={css('ms-BasePicker ms-BaseFloatingPicker', classNames.root, props.className ? props.className : '')}>
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
        <div>Coming soon..</div>
      </Callout>
    </div>
  );
};
