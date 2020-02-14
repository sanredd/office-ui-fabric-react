import { IFloatingSuggestionsListStyleProps, IFloatingSuggestionsListStyle } from './FloatingSuggestionsList.types';
import { getGlobalClassNames, getTheme } from '@uifabric/styling';

const GlobalClassNames = {
  root: 'ms-FloatingSuggestionsList',
  suggestionsContainer: 'ms-FloatingSuggestionsList-container',
  title: 'ms-FloatingSuggestionsList-title',
  noSuggestions: 'ms-FloatingSuggestionsList-noSuggestions'
};

export const getStyles = (props: IFloatingSuggestionsListStyleProps): IFloatingSuggestionsListStyle => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  const { palette, fonts } = theme;
  const { themePrimary, neutralLight, neutralLighter, neutralDark, neutralTertiaryAlt } = palette;
  const colors = {
    defaultHoverBackground: neutralLighter,
    defaultNeutralLight: neutralLight,
    defaultHeaderText: neutralDark,
    defaultNeutralTertiaryAlt: neutralTertiaryAlt,
    defaultThemePrimary: themePrimary
  };
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        minWidth: '260px'
      }
    ],
    suggestionsContainer: [
      classNames.suggestionsContainer,
      {
        overflowX: 'auto',
        overflowY: 'hidden',
        maxHeight: '300px',
        borderBottom: `1px solid ${colors.defaultNeutralLight}`
      }
    ],
    title: [
      classNames.title,
      {
        padding: '0 12px',
        color: colors.defaultThemePrimary,
        fontSize: fonts.small.fontSize,
        lineHeight: '40px',
        borderBottom: `1px solid ${colors.defaultNeutralLight}`
      }
    ],
    noSuggestions: [
      classNames.noSuggestions,
      {
        textAlign: 'center',
        color: palette.neutralPrimaryAlt,
        fontSize: fonts.small.fontSize,
        lineHeight: '30px'
      }
    ]
  };
};
