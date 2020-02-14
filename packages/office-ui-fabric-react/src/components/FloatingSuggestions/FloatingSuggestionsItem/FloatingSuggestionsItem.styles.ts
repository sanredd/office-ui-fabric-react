import { getGlobalClassNames, getTheme, HighContrastSelector } from '@uifabric/styling';
import { IFloatingSuggestionItemStylesProps, IFloatingSuggestionItemStyles } from './FloatingSuggestionsItem.types';

const GlobalClassNames = {
  root: 'ms-FloatingSuggestionsItem',
  itemButton: 'ms-FloatingSuggestionsItem-itemButton',
  closeButton: 'ms-FloatingSuggestionsItem-closeButton'
};

export const getStyles = (props: IFloatingSuggestionItemStylesProps): IFloatingSuggestionItemStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  const { palette } = theme;
  const { neutralLighter, neutralDark, neutralTertiaryAlt } = palette;
  const colors = {
    // default hover
    defaultHoverBackground: neutralLighter,
    // selected
    defaultHeaderText: neutralDark,
    defaultNeutralTertiaryAlt: neutralTertiaryAlt
  };
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        alignItems: 'stretch',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        selectors: {
          '&:hover': {
            background: colors.defaultHoverBackground,
            [`.${classNames.closeButton}`]: {
              display: 'block'
            }
          }
        }
      }
    ],
    itemButton: [
      classNames.itemButton,
      {
        width: '100%',
        padding: '0px',
        minWidth: '0',
        height: '100%',
        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText'
          },
          '&:hover': {
            color: colors.defaultHeaderText
          }
        }
      }
    ],
    closeButton: [
      classNames.closeButton,
      {
        padding: '0 4px',
        height: 'auto',
        width: '32px',
        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText'
          },
          '&:hover': {
            background: colors.defaultHeaderText,
            color: colors.defaultNeutralTertiaryAlt
          }
        }
      }
    ]
  };
};
