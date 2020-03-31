import * as React from 'react';
import { getStyles } from './UnifiedPicker.styles';
import { classNamesFunction, css, SelectionMode, Selection, KeyCodes } from '../../Utilities';
import { IUnifiedPickerStyleProps, IUnifiedPickerStyles } from './UnifiedPicker.styles';
import { FocusZoneDirection, FocusZone, SelectionZone, Autofill, IInputProps, MarqueeSelection } from 'office-ui-fabric-react';
import { IUnifiedPickerProps } from './UnifiedPicker.types';
import { useQueryString } from './hooks/useQueryString';
import { useFloatingSuggestionItems } from './hooks/useFloatingSuggestionItems';
import { useSelectedItems } from './hooks/useSelectedItems';
import { IFloatingSuggestionItemProps } from '../../FloatingSuggestionsComposite';
import { copyToClipboard } from '../SelectedItemsList';

export const UnifiedPicker = <T extends {}>(props: IUnifiedPickerProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IUnifiedPickerStyleProps, IUnifiedPickerStyles>();
  const classNames = getClassNames(getStyles);

  const rootRef = React.createRef<HTMLDivElement>();
  const input = React.useRef<Autofill>(null);
  const { queryString, setQueryString } = useQueryString('');
  const [selection, setSelection] = React.useState(new Selection({ onSelectionChanged: () => _onSelectionChanged() }));
  const [focusedItemIndices, setFocusedItemIndices] = React.useState(selection.getSelectedIndices() || []);
  const { suggestions, selectedSuggestionIndex, isSuggestionsVisible } = props.floatingSuggestionProps;
  const {
    focusItemIndex,
    suggestionItems,
    isSuggestionsShown,
    showPicker,
    selectPreviousSuggestion,
    selectNextSuggestion
  } = useFloatingSuggestionItems(suggestions, selectedSuggestionIndex, isSuggestionsVisible);
  const { selectedItems, addItems, removeItems, removeItemAt, removeSelectedItems, unselectAll } = useSelectedItems(
    selection,
    props.selectedItemsListProps.selectedItems
  );

  const _onSelectionChanged = () => {
    console.log('selected index:' + selection.getSelectedIndices());
    showPicker(false);
    setSelection(selection);
    setFocusedItemIndices(selection.getSelectedIndices());
  };

  const {
    className,
    focusZoneProps,
    inputProps,
    onRenderSelectedItems,
    selectedItemsListProps,
    onRederFloatingSuggestions,
    floatingSuggestionProps,
    headerComponent
  } = props;

  const activeDescendant = '';
  const isExpanded = true;

  const _onBackspace = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }

    if (selectedItems.length) {
      if (
        focusedItemIndices.length === 0 &&
        input &&
        input.current &&
        !input.current.isValueSelected &&
        input.current.inputElement === document.activeElement &&
        (input.current as Autofill).cursorLocation === 0
      ) {
        showPicker(false);
        ev.preventDefault();
        removeItemAt(selectedItems.length - 1);
      } else if (focusedItemIndices.length > 0) {
        showPicker(false);
        ev.preventDefault();
        removeSelectedItems();
        input.current?.focus();
      }
    }
  };

  const _onInputKeyDown = (ev: React.KeyboardEvent<Autofill | HTMLElement>) => {
    console.log('on input keyDown');
    if (isSuggestionsShown) {
      const keyCode = ev.which;
      switch (keyCode) {
        case KeyCodes.escape:
          showPicker(false);
          ev.preventDefault();
          ev.stopPropagation();
          break;
        case KeyCodes.enter:
          if (!ev.shiftKey && !ev.ctrlKey && focusItemIndex >= 0) {
            ev.preventDefault();
            ev.stopPropagation();
            // Get the focused element and add it to selectedItemsList
            showPicker(false);
            _onSuggestionSelected(ev, suggestionItems[focusItemIndex]);
          }
          break;
        case KeyCodes.up:
          ev.preventDefault();
          ev.stopPropagation();
          selectPreviousSuggestion();
          break;
        case KeyCodes.down:
          ev.preventDefault();
          ev.stopPropagation();
          selectNextSuggestion();
          break;
      }
    }
  };

  const _onCopy = () => {
    console.log('copy handler');
    if (focusedItemIndices.length > 0 && props.selectedItemsListProps?.getItemCopyText) {
      const copyItems = selection.getSelection() as T[];
      const copyString = props.selectedItemsListProps.getItemCopyText(copyItems);
      copyToClipboard(copyString);
    }
  };
  const _onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    unselectAll();
    if (props.inputProps && props.inputProps.onFocus) {
      props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
    console.log('on iput focus');
  };
  const _onInputClick = () => {
    unselectAll();
    showPicker(true);
    console.log('on input click');
  };
  const _onInputChange = (value: string, composing?: boolean) => {
    if (!composing) {
      // update query string
      setQueryString(value);
      // update floatingpicker suggestions
    }
    console.log(`${value} :on input change`);
  };
  const _onPaste = (ev: React.ClipboardEvent<Autofill | HTMLInputElement>) => {
    if (props.onPaste) {
      const inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      // Pass current selected items
      props.onPaste(inputText, selectedItems);
    }
    console.log('on paste');
  };

  const _renderSelectedItemsList = (): JSX.Element => {
    return onRenderSelectedItems({
      ...selectedItemsListProps,
      selectedItems: selectedItems,
      focusedItemIndices: focusedItemIndices,
      onItemsRemoved: _onRemoveSelectedItems
    });
  };
  const _canAddItems = () => true;
  const _onFloatingSuggestionsDismiss = (ev: React.MouseEvent): void => {
    if (props.floatingSuggestionProps.onFloatingSuggestionsDismiss) {
      props.floatingSuggestionProps.onFloatingSuggestionsDismiss();
    }
    showPicker(false);
  };
  const _onSuggestionSelected = (ev: any, item: IFloatingSuggestionItemProps<T>) => {
    if (props.floatingSuggestionProps.onSuggestionSelected) {
      props.floatingSuggestionProps.onSuggestionSelected(ev, item);
    }
    addItems([item.item]);
    showPicker(false);
  };
  const _onRemoveSelectedItems = (itemsToRemove: T[]) => {
    if (props.selectedItemsListProps.onItemsRemoved) {
      props.selectedItemsListProps.onItemsRemoved(itemsToRemove);
    }
    removeItems(itemsToRemove);
  };
  const _renderFloatingPicker = () =>
    onRederFloatingSuggestions({
      ...floatingSuggestionProps,
      targetElement: input.current?.inputElement,
      isSuggestionsVisible: isSuggestionsShown,
      suggestions: suggestionItems,
      selectedSuggestionIndex: focusItemIndex,
      onFloatingSuggestionsDismiss: _onFloatingSuggestionsDismiss,
      onSuggestionSelected: _onSuggestionSelected,
      onKeyDown: _onInputKeyDown
    });

  return (
    <div
      ref={rootRef}
      className={css('ms-BasePicker ms-BaseExtendedPicker', className ? className : '')}
      onKeyDown={_onBackspace}
      onCopy={_onCopy}
    >
      <FocusZone direction={FocusZoneDirection.bidirectional} {...focusZoneProps}>
        <MarqueeSelection selection={selection} isEnabled={true}>
          <SelectionZone selection={selection} selectionMode={SelectionMode.multiple}>
            <div className={css('ms-BasePicker-text', classNames.pickerText)} role={'list'}>
              {headerComponent}
              {_renderSelectedItemsList()}
              {_canAddItems() && (
                <Autofill
                  {...(inputProps as IInputProps)}
                  className={css('ms-BasePicker-input', classNames.pickerInput)}
                  ref={input}
                  onFocus={_onInputFocus}
                  onClick={_onInputClick}
                  onInputValueChange={_onInputChange}
                  aria-activedescendant={activeDescendant}
                  aria-owns={isExpanded ? 'suggestion-list' : undefined}
                  aria-expanded={isExpanded}
                  aria-haspopup="true"
                  role="combobox"
                  disabled={false}
                  onPaste={_onPaste}
                  onKeyDown={_onInputKeyDown}
                />
              )}
            </div>
          </SelectionZone>
        </MarqueeSelection>
      </FocusZone>
      {_renderFloatingPicker()}
    </div>
  );
};
