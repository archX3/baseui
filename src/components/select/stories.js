// @flow
/*global module */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withStyle} from 'styletron-react';
import {styled} from '../../styles';

// Styled elements
import {
  Select,
  StyledRoot,
  StyledInput,
  StyledInputContainer,
  StyledTag,
  StyledSearchIcon,
  StyledDropDown,
  StyledOption,
  ICON,
  OPTIONS,
  TYPE,
} from './index';

class ParentSearch extends React.Component<{}, {}> {
  static defaultProps: {} = {};
  constructor(props: {}) {
    super(props);
    this.state = {
      options: [],
      selectedOptions: [
        {
          id: '123',
          label: 'label for 123',
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <Select
          multiple={true}
          type={TYPE.SEARCH}
          initialState={{
            selectedOptions: this.state.selectedOptions,
          }}
          label="Search for tags"
          caption="Some caption"
          placeholder="Start searching"
          onClearAll={() => console.log('Cleared text')}
          onSelect={(e, {id, label}, selectedTags) => {
            console.log('Selected id:' + id + 'with label ' + label);
          }}
          onKeyUp={e => {
            let text = e.target.value;
            let options = [];
            let optionsLength = this.state.options.length;
            if (text.length > 5) {
              optionsLength = Math.round(Math.random() * 10);
              for (let i = 0; i < optionsLength; i++) {
                const id = Math.round(Math.random() * 10000);
                const label = text + id;
                options.push({id, label});
              }
              this.setState({options: options});
            }
          }}
        >
          {this.state.options}
        </Select>
      </React.Fragment>
    );
  }
}

class ParentSelect extends React.Component<{}, {}> {
  static defaultProps: {} = {};
  constructor(props: {}) {
    super(props);
    this.state = {
      options: [
        {
          id: '1',
          label: 'label for 1',
        },
        {
          id: '2',
          label: 'label for 2',
        },
        {
          id: '3',
          label: 'label for 3',
        },
        {
          id: '4',
          label: 'label for 4',
        },
      ],
      selectedOptions: [
        {
          id: '123',
          label: 'preselected label for 123',
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <Select
          multiple={this.props.multiple}
          type={TYPE.SELECT}
          initialState={{
            value: 'sdgsdf',
            selectedOptions: this.state.selectedOptions,
          }}
          label="Select"
          placeholder={this.props.multiple ? null : 'Choose one'}
          onSelect={(e, {id, label}, selectedTags) => {
            console.log('Selected id:' + id + 'with label ' + label);
          }}
        >
          {this.state.options}
        </Select>
      </React.Fragment>
    );
  }
}

storiesOf('Select', module)
  .add('In search\\autocomplete mode with tags added', () => {
    return <ParentSearch />;
  })
  .add('In Select multiple mode', () => {
    return <ParentSelect multiple={true}/>;
  })
  .add('In Select single mode', () => {
    return <ParentSelect />;
  });
