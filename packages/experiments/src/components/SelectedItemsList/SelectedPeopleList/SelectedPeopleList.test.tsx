import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedPeopleList, ISelectedPeopleList } from './SelectedPeopleList';

describe('SelectedPeopleList', () => {
  it('renders personas that are passed in', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList selectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    const personANodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person A') !== -1);
    const personBNodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person B') !== -1);
    expect(personANodes.length).toBeGreaterThan(0);
    expect(personBNodes.length).toBeGreaterThan(0);

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
