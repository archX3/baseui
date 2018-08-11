// @flow
import * as React from 'react';
import {
  Root as StyledRoot,
  Input as StyledInput,
  InputContainer as StyledInputContainer,
  Tag as StyledTag,
  SearchIcon as StyledSearchIcon,
  DropDown as StyledDropDown,
  Option as StyledOption,
} from './styled-components';

import {
  Input as InputComponent,
} from '../input';

import {ICON, TYPE} from './constants';
import SelectDropDown from './dropdown';

class Select extends React.Component<any, any> {
  static defaultProps = {
    overrides: {},
    selectedOptions: [],
    onSelect: () => {},
    onUnSelect: () => {},
    onClearAll: () => {},
  };

  state = {
    textValue: '',
    selectedOptions: [],
    isDropDownOpen: this.props.type === TYPE.SEARCH,
    ...this.props,
  };

  constructor(props: any) {
    super(props);
    if (this.props.type === TYPE.SELECT) {
      const {selectedOptions} = this.state;
      const {children} = this.props;
      selectedOptions.forEach(selectedOption => {
        // selected option is not in all options and needs to be added on top
        if (!children.find(selected => selected.id === selectedOption.id)) {
          children.unshift({
            id: selectedOption.id,
            label: this.getOptionLabel(selectedOption),
          });
        }
      });
    }
  }

  onFocus = (e: SyntheticEvent<HTMLInputElement>) => {
  };

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
  };

  onMouseEnter = (e: SyntheticEvent<HTMLInputElement>) => {
  };

  onMouseLeave = (e: SyntheticEvent<HTMLInputElement>) => {
  };

  onClearAll = (e: SyntheticEvent<HTMLInputElement>) => {
    const newTextValue = '';
    this.setState({textValue: newTextValue});
    this.props.onClearAll(e, {textValue: newTextValue});
  };

  onSelect = (e, id, label) => {
    const {
      multiple,
    } = this.props;
    const selected = this.state.selectedOptions.find(tag => tag.id === id);
    let selectedOptions;
    if (!selected) {
      const selectedOptions = multiple ? this.state.selectedOptions.slice() : [];
      selectedOptions.push({id, label});
      this.setState({selectedOptions: selectedOptions});
      if (this.props.type === TYPE.SELECT && !multiple) {
        this.setState({isDropDownOpen: false});
      }
      this.props.onSelect(e, {id, label, selectedOptions});
    } else if (multiple) {
      selectedOptions = this.state.selectedOptions.filter(selectedOption => selectedOption.id !== selected.id);
      this.setState({
        selectedOptions: selectedOptions,
      });
      this.props.onUnSelect(e, {id, label, selectedOptions});
    }
  };

  onKeyUp = (e: SyntheticEvent<HTMLInputElement>) => {
    const newTextValue = e.target.value;
    this.setState({textValue: newTextValue});
    this.props.onKeyUp(e, {textValue: newTextValue});
  };

  render() {
    const {
      Root = StyledRoot,
    } = this.props.overrides;
    return (
      <Root>
        {this.props.type === TYPE.SEARCH ? this.getSearch() : this.getSelect()}
        {this.getDropDown()}
      </Root>
    );
  }

  getSelect() {
    const {
      Root = StyledRoot,
      Input = StyledInput,
      SearchIcon = StyledSearchIcon,
    } = this.props.overrides;
    const {
      label,
      placeholder,
      caption,
    } = this.props;
    const {
      selectedOptions,
    } = this.state;
    return (
      <div
        onClick={() => {
          this.setState({isDropDownOpen: !this.state.isDropDownOpen});
        }}
      >
        <InputComponent
          disabled={true}
          label={label}
          placeholder={!selectedOptions.length ? placeholder : null}
          caption={caption}
          overrides={{
            Root: Root,
            Input: Input,
            After: () => (
              <SearchIcon
                $type={ICON.SELECT}
                src={
                  'data:image/svg+xml;utf8,<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.29289 5.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H10.7929C11.2383 0 11.4614 0.538571 11.1464 0.853554L6.70711 5.29289C6.31658 5.68342 5.68342 5.68342 5.29289 5.29289Z" transform="translate(12) scale(-1 1)" fill="#666666"/></svg>'
                }
              />
            ),
            Before: () => this.getMultipleSelections(),
          }}
        />
      </div>
    );
  }

  getSearch() {
    const {
      Input = StyledInput,
      InputContainer = StyledInputContainer,
      SearchIcon = StyledSearchIcon,
    } = this.props.overrides;
    const {
      label,
      placeholder,
      caption,
      onKeyUp,
      error,
    } = this.props;
    const {
      textValue,
    } = this.state;
    return (
      <InputComponent
        error={error}
        label={label}
        placeholder={placeholder}
        caption={caption}
        value={textValue}
        onChange={e => this.setState({textValue: e.target.value})}
        overrides={{
          Input: {
            props: {
              onKeyUp: onKeyUp,
            },
            component: Input,
          },
          InputContainer: InputContainer,
          After: () => (
            <SearchIcon
              onClick={e => this.onClearAll(e)}
              $type={ICON.CLEAR_ALL}
              src={
                'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58173 12.4183 0 8 0C3.58173 0 0 3.58173 0 8C0 12.4183 3.58173 16 8 16ZM6.03033 4.96967C5.73743 4.67679 5.26257 4.67679 4.96967 4.96967C4.67676 5.26257 4.67676 5.73743 4.96967 6.03033L6.93933 8L4.96967 9.96967C4.67676 10.2626 4.67676 10.7374 4.96967 11.0303C5.26257 11.3232 5.73743 11.3232 6.03033 11.0303L8 9.06067L9.96967 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.96967L9.06067 8L11.0303 6.03033C11.3232 5.73743 11.3232 5.26257 11.0303 4.96967C10.7374 4.67679 10.2626 4.67679 9.96967 4.96967L8 6.93933L6.03033 4.96967Z" fill="#999999"/></svg>'
              }
            />
          ),
          Before: () => this.getMultipleSelections(),
        }}
      />
    );
  }

  getMultipleSelections() {
    const {
      Tag = StyledTag,
      SearchIcon = StyledSearchIcon,
    } = this.props.overrides;
    const {
      selectedOptions,
    } = this.state;
    const {
      multiple,
      type
    } = this.props;
    return (
      <React.Fragment>
        {type === TYPE.SEARCH && (
          <SearchIcon
            $type={ICON.LOOP}
            src={
              'data:image/svg+xml;utf8,<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9L13 13M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z" transform="translate(1 1)" stroke="#1B6DE0" stroke-width="2" stroke-linecap="round"/></svg>'
            }
          />
        )}
        {selectedOptions.map(option => (
          <Tag key={option.id} $multiple={multiple}>
            {this.getSelectedOptionLabel(option)}
            {multiple && (
              <SearchIcon
                onClick={e => {
                  this.setState({
                    selectedOptions: this.state.selectedOptions.filter(selectedOption => selectedOption.id !== option.id),
                  });
                  e.stopPropagation();
                }}
                $type={ICON.CLEAR_TAG}
                src={
                  'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L3.33333 2.39052L5.5286 0.195262C5.78895 -0.0650874 6.21106 -0.0650874 6.4714 0.195262C6.73175 0.455612 6.73175 0.877722 6.4714 1.13807L4.27614 3.33333L6.4714 5.5286C6.73175 5.78895 6.73175 6.21106 6.4714 6.4714C6.21106 6.73175 5.78895 6.73175 5.5286 6.4714L3.33333 4.27614L1.13807 6.4714C0.877722 6.73175 0.455612 6.73175 0.195262 6.4714C-0.0650874 6.21106 -0.0650874 5.78895 0.195262 5.5286L2.39052 3.33333L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z" transform="translate(4.66675 4.6665)" fill="#276EF1"/></svg>'
                }
              />
            )}
          </Tag>
        ))}
      </React.Fragment>
    );
  }

  getDropDown() {
    const {
      children = [],
      overrides,
      type,
    } = this.props;
    const {
      isDropDownOpen,
      selectedOptions,
    } = this.state;
    const dropDownProps = {
      type,
      children,
      overrides,
      isDropDownOpen,
      selectedOptions,
      getOptionLabel: this.getOptionLabel.bind(this),
      onSelect: this.onSelect.bind(this),
    };
    return <SelectDropDown {...dropDownProps}>{children}</SelectDropDown>;
  }

  getOptionLabel(option) {
    const {
      getOptionLabel
    } = this.props;
    return getOptionLabel ? getOptionLabel(option) : option.label;
  }

  getSelectedOptionLabel(option) {
    const {
      getSelectedOptionLabel
    } = this.props;
    return getSelectedOptionLabel ? getSelectedOptionLabel(option) : this.getOptionLabel(option);
  }
}

export default Select;
