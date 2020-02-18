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

  const { palette, semanticColors } = theme;
  const { neutralDark, neutralTertiaryAlt, neutralSecondary } = palette;
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
            background: semanticColors.menuItemBackgroundHovered
          },
          '&:hover .ms-FloatingSuggestionsItem-closeButton': {
            display: 'block'
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
            color: semanticColors.menuItemTextHovered
          }
        }
      }
    ],
    closeButton: [
      classNames.closeButton,
      {
        display: 'none',
        color: neutralSecondary,
        padding: '0 4px',
        height: 'auto',
        width: 32,
        selectors: {
          ':hover, :active': {
            background: neutralTertiaryAlt,
            color: neutralDark
          },
          [HighContrastSelector]: {
            color: 'WindowText'
          }
        }
      }
    ]
  };
};
