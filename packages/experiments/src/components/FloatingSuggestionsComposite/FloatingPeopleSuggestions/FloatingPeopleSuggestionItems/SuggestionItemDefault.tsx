/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css, classNamesFunction } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { ISuggestionItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { getStyles, ISuggestionItemDefaultStylesProps, ISuggestionItemDefaultStyles } from './SuggestionItemDefault.styles';

export const SuggestionItemNormal: (persona: IPersonaProps) => JSX.Element = (
  personaProps: IPersonaProps,
  suggestionItemProps?: ISuggestionItemProps<IPersonaProps>
) => {
  const getClassNames = classNamesFunction<ISuggestionItemDefaultStylesProps, ISuggestionItemDefaultStyles>();
  const classNames = getClassNames(getStyles);
  return (
    <div className={css('ms-PeoplePicker-personaContent', classNames.personaContent)}>
      <Persona
        presence={personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none}
        size={PersonaSize.size40}
        className={css('ms-PeoplePicker-Persona', classNames.persona)}
        showSecondaryText={true}
        {...personaProps}
      />
    </div>
  );
};
