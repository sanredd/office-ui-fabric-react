import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { FloatingPeopleSuggestionsExample } from './examples/FloatingPeopleSuggestions.Example';

const FloatingPeoplePickerSuggestionsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FloatingSuggestionsComposite/examples/FloatingPeopleSuggestions.Example.tsx') as string;

export class FloatingSuggestionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="FloatingSuggestions"
        componentName="FloatingSuggestions"
        exampleCards={
          <div>
            <ExampleCard title="Basic" isOptIn={true} code={FloatingPeoplePickerSuggestionsExampleCode}>
              <FloatingPeopleSuggestionsExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!experiments/src/components/loatingSuggestionsComposite/FloatingPeopleSuggestions.types.ts')
            ]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use them to display a list of people suggetions</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them to display things that aren't people suggestions</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
