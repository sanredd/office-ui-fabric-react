import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  FloatingPeopleSuggestions,
  IFloatingSuggestionItem,
  IFloatingPeopleSuggestionsProps
} from '@uifabric/experiments/lib/FloatingPeopleSuggestionsComposite';
import { UnifiedPeoplePicker } from '@uifabric/experiments/src/components/UnifiedPicker/UnifiedPeoplePicker/UnifiedPeoplePicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { mru } from '@uifabric/example-data';
import { ISelectedPeopleListProps } from '../../../SelectedItemsList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

const _suggestions = [
  {
    key: '1',
    id: '1',
    displayText: 'Suggestion 1',
    item: mru[0],
    isSelected: true,
    showRemoveButton: true
  },
  {
    key: '2',
    id: '2',
    displayText: 'Suggestion 2',
    item: mru[1],
    isSelected: false,
    showRemoveButton: true
  },
  {
    key: '3',
    id: '3',
    displayText: 'Suggestion 3',
    item: mru[2],
    isSelected: false,
    showRemoveButton: true
  },
  {
    key: '4',
    id: '4',
    displayText: 'Suggestion 4',
    item: mru[3],
    isSelected: false,
    showRemoveButton: true
  },
  {
    key: '5',
    id: '5',
    displayText: 'Suggestion 5',
    item: mru[4],
    isSelected: false,
    showRemoveButton: true
  }
] as IFloatingSuggestionItem<IPersonaProps>[];

export const FloatingPeopleSuggestionsExample = (): JSX.Element => {
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([..._suggestions]);

  const _onSuggestionSelected = (ev: React.MouseEvent<HTMLElement, MouseEvent>, item: IFloatingSuggestionItemProps<IPersonaProps>) => {
    _markSuggestionSelected(item);
  };

  const _onSuggestionRemoved = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    suggestionToRemove: IFloatingSuggestionItemProps<IPersonaProps>
  ) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.filter(item => item.id !== suggestionToRemove.id);
      return modifiedSuggestions;
    });
  };

  const _markSuggestionSelected = (selectedSuggestion: IFloatingSuggestionItemProps<IPersonaProps>) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.map(suggestion =>
        suggestion.id === selectedSuggestion.id ? { ...suggestion, isSelected: true } : { ...suggestion, isSelected: false }
      );
      return modifiedSuggestions;
    });
  };

  const selectionListSelection: Selection = new Selection();

  const floatingPeoplePickerProps = {
    suggestions: [...peopleSuggestions],
    isSuggestionsVisible: false,
    targetElement: null,
    onSuggestionSelected: _onSuggestionSelected,
    onRemoveSuggestion: _onSuggestionRemoved,
    suggestionsHeaderText: 'People suggestions',
    noResultsFoundText: 'No suggestions',
    onFloatingSuggestionsDismiss: undefined,
    showSuggestionRemoveButton: true
  } as IFloatingPeopleSuggestionsProps;

  const selectedPeopleListProps = {
    ref: null,
    key: 'normal',
    removeButtonAriaLabel: 'Remove',
    selectedItems: [],
    selection: selectionListSelection,
    onItemsRemoved: () => {
      console.log('example onItemsRemoved');
    }
  } as ISelectedPeopleListProps<IPersonaProps>;

  return (
    <>
      {/* <FloatingPeopleSuggestions
        suggestions={[...peopleSuggestions]}
        isSuggestionsVisible={true}
        targetElement={null}
        onSuggestionSelected={_onSuggestionSelected}
        onRemoveSuggestion={_onSuggestionRemoved}
        suggestionsHeaderText={'People suggestions'}
        noResultsFoundText={'No suggestions'}
        onFloatingSuggestionsDismiss={undefined}
        showSuggestionRemoveButton={true}
      /> */}
      <br />
      <UnifiedPeoplePicker selectedItemsListProps={selectedPeopleListProps} floatingSuggestionProps={floatingPeoplePickerProps} />
    </>
  );
};
