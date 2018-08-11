/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
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

import {ICON} from './constants';

const SelectDropDown = function(props: StatefulSelectPropsT) {
  const {
    SearchIcon = StyledSearchIcon,
    DropDown = StyledDropDown,
    Option = StyledOption,
  } = props.overrides;
  const {
    children = [],
    getOptionLabel,
    isDropDownOpen,
    selectedOptions,
    onSelect,
    type,
  } = props;
  return children.length ? (
    <DropDown $type={type} $isOpen={isDropDownOpen}>
      {children.map(option => {
        const $selected = selectedOptions.find(selected => selected.id === option.id);
        const events = option.disabled
          ? {
              onClickCapture: e => e.stopPropagation(),
            }
          : {
              onClick: e => onSelect(e, option.id, getOptionLabel(option)),
            };
        return (
          <Option
            disabled={option.disabled}
            $selected={$selected}
            {...events}
            key={option.id}
          >
            {$selected && (
              <SearchIcon
                $type={ICON.SELECTED}
                src={
                  'data:image/svg+xml;utf8,<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L4 9L10 1" stroke="#1B6DE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                }
              />
            )}
            {getOptionLabel(option)}
          </Option>
        );
      })}
    </DropDown>
  ) : (
    <div />
  );
};
SelectDropDown.displayName = 'SelectDropDown';
export default SelectDropDown;
