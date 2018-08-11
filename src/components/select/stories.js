// @flow
/*global module */
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withStyle} from 'styletron-react';
import {styled} from '../../styles';

// Styled elements
import {
  StatefulSelect,
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
        <StatefulSelect
          multiple={true}
          type={TYPE.SEARCH}
          initialState={{
            selectedOptions: this.state.selectedOptions,
            textValue: 'Predefined text search value',
          }}
          label="Search for tags"
          caption="Some caption"
          placeholder="Start searching"
          onClearAll={() => console.log('Cleared text')}
          onSelect={(e, {id, label, selectedOptions}) => {
            console.log('Selected id:' + id + 'with label ' + label);
          }}
          onUnSelect={(e, {id, label, selectedOptions}) => {
            console.log('Unselected id:' + id + 'with label ' + label);
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
        </StatefulSelect>
      </React.Fragment>
    );
  }
}

class ParentSelect extends React.Component<{}, {}> {
  static defaultProps: {} = {};
  constructor(props: {}) {
    super(props);
    const {
      options = []
    } = props;
    this.state = {
      options: options.length
        ? options
        : [
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
      selectedOptions: options.length
        ? [options[0]]
        : [
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
        <StatefulSelect
          getSelectedOptionLabel={this.props.getSelectedOptionLabel}
          getOptionLabel={this.props.getOptionLabel}
          multiple={this.props.multiple}
          type={TYPE.SELECT}
          initialState={{
            selectedOptions: this.state.selectedOptions,
          }}
          label="Select"
          placeholder={this.props.multiple ? null : 'Choose one'}
          onSelect={(e, {id, label}, selectedTags) => {
            console.log('Selected id:' + id + 'with label ' + label);
          }}
        >
          {this.state.options}
        </StatefulSelect>
      </React.Fragment>
    );
  }
}

storiesOf('Select', module)
  .add('In search\\autocomplete mode with tags added', () => {
    return <ParentSearch />;
  })
  .add('In Select multiple mode', () => {
    return <ParentSelect multiple={true} />;
  })
  .add('In Select single mode', () => {
    return <ParentSelect />;
  })
  .add('In Select multiple mode with Custom Labels', () => {
    return (
      <ParentSelect
        multiple={true}
        options={[
          {
            id: '1',
            label: <span>
                <img style={{
                    borderRadius: '50%',
                    height: '75px',
                  }} src="https://fusionjs.com/static/nadiia.37070301.jpg"/>Nadiia</span>,
          },
          {
            id: '2',
            label: <span>
              <img style={{
                    borderRadius: '50%',
                    height: '75px',
                  }} src="https://fusionjs.com/static/mlmorg.c28c19d7.jpeg"/>Matt</span>,
          },
        ]}
      />
    );
  })
  .add('In Select multiple mode with Custom Labels and Custom Selected labels', () => {
      const options = [
        {
          id: '1',
          label: <span>
            <img style={{
                  borderRadius: '50%',
                  height: '75px',
                }} src="https://fusionjs.com/static/nadiia.37070301.jpg"/>Nadiia</span>,
          text: 'Nadiia',
          imgSrc: 'https://fusionjs.com/static/nadiia.37070301.jpg'
        },
        {
          id: '2',
          label: <span>
              <img style={{
                  borderRadius: '50%',
                  height: '75px',
                }} src="https://fusionjs.com/static/mlmorg.c28c19d7.jpeg"/>Matt</span>,
          text: 'Matt',
          imgSrc: 'https://fusionjs.com/static/mlmorg.c28c19d7.jpeg',
        },
    ];
      return (
        <ParentSelect
          multiple={true}
          getSelectedOptionLabel={option => <span>
              <img style={{
                  borderRadius: '50%',
                  height: '50px',
                }} src={options.find(opt => opt.id === option.id).imgSrc}/>{options.find(opt => opt.id === option.id).text + ' SELECTED'}</span>}
          options={options}
        />
    );
  })
  .add('In Select single mode with some disabled', () => {
    return (
      <ParentSelect
        multiple={true}
        options={[
          {
            id: '1',
            label: 'label for 1',
          },
          {
            id: '2',
            label: 'label for 2',
            disabled: true,
          },
          {
            id: '3',
            label: 'label for 3',
          },
          {
            id: '4',
            label: 'label for 4',
            disabled: true,
          },
        ]}
      />
    );
  });
