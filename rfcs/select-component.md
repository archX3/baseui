# Select Component

### Exports

* `StatefulSelect`
* `StatefulSelectContainer`
* `Select`
* `StyledSelectInput`
* `StyledOption`
* `StyledDropDown`
* `StyledLabel`
* `StyledHint`

### `Select` and `StatefulSelect` API

* `type: TYPE.SEARCH | TYPE.SELECT`:
  type of component to be in select or search mode (with lookup input)  
* `selectedOptions: Array<Object>`:
  Current selected options. Every option object has `id: string` and `label: React$Node`. Label is defaulted to display for selected option, otherwise see `getSelectedOptionLabel` method
* `placeholder: ?string`:
  Placeholder text if nothing is selected. Default is `Choose one...`
* `rows: ?number`:
  Represents maximum visible length of options, all other will be scrolled. If not defined, all options will be visible.
* `children: Array<Object>`:
  All Options in dropdown. Should be provided for Select and Search mode equally. Every option object has `id: string` and `label: React$Node`. Label is defaulted to display for option in dropdown, otherwise see `getOptionLabel` method. Optional `disabled: boolean` for option to be disabled from selection. 
* `label: ?React$Node`:
  Component or String representing label for Select component. Default is `''`
* `caption: ?React$Node`:
  Component or String representing hint message for Select component. Default is `''`
* `textValue: ?string`:
  Initial text value for Search to lookup for text. 
* `error: ?string`:
  Error message and error state. Default is `''`
* `multiple: ?boolean`:
  Sets if multiple choices are allowed in Select component. Default is `false`
* `autoFocus: boolean`:
  make the control focused (active). Default is `false`
* `disabled: boolean`:
  Disable control from being changed
* `required: boolean`:
  Mark control as required
* `overrides: {}`
  * `DropDown: ?React$Node` component to use for dropdown list
  * `Option: ?React$Node` component to use for options in dropdown list
  * `Root: ?React$Node` component to use for most top of the select component
  * `Input: ?React$Node` component for Input showing current selected value(s). See `Input` Control of this framework for reference to override it's functionality.
  * `SearchIcon: ?React$Node` component for all icons appearing in Select component. It's provided `$type: ICON.LOOP | ICON.CLEAR_TAG | ICON.CLEAR_ALL | ICON.SELECTED` to setup corresponding icon of Select component
  * `Tag: ?React$Node` component for selected options Tags shown in Input for multiple mode selection
* `onSelect: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option is selected. `params` has `id` and `label` of selected option and `selectedOptions` array of all of selected.
* `onUnSelect: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option is unselected (for multiple choices). `params` has `id` and `label` of unSelected option and `selectedOptions` array of all of selected.
* `onClearAll: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when input is cleared (in Search mode). `params` has new `textValue` set in input.
* `onKeyUp: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when input has changed value (in Search mode). Handler for changing possible Options (as children). `params` has new `textValue` set in input.
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element
* `onBlur: func`:
  handler for events on trigger element

### `StatefulSelectContainer` API

* `initialState: {}`
  Initial state of an uncontrolled popover component.
  * `textValue` - an initial text value state for Inout in search mode. 
  * `selectedOptions` - an initial set of selected options. They are prepended to all Options array if not found there. 
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any, params: Object) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
  * `params` may contain `id` and `label` of selected option and `selectedOptions` array of all of selected, as well as new `textValue` set in input.
* `children: func` should return `Select` instance with standard or customized inner elements.
* `onSelect: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option is selected. `params` has `id` and `label` of selected option and `selectedOptions` array of all of selected.
* `onUnSelect: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option is unselected (for multiple choices). `params` has `id` and `label` of unSelected option and `selectedOptions` array of all of selected.
* `onClearAll: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when input is cleared (in Search mode). `params` has new `textValue` set in input.
* `onKeyUp: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when input has changed value (in Search mode). Handler for changing possible Options (as children). `params` has new `textValue` set in input.
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element
* `onBlur: func`:
  handler for events on trigger element

### Usage

```js
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

import {withStyle} from 'styletron-react';

const CustomOption = withStyle(StyledOption, {
  textColor: 'red',
});

export default () => {
  const options = [
      {
        id: '1',
        label: <span>
          <img style={{
                borderRadius: '50%',
                height: '75px',
          }} src="1.jpg"/>First</span>,
      },
      {
        id: '2',
        disabled: true,
        label: <span>
          <img style={{
                borderRadius: '50%',
                height: '75px',
          }} src="2.jpg"/>Second</span>,
      },
  ];
  return (
    <React.Fragment>
      <StatefulSelect
        initialState={{
          selectedOptions: [
            {
                id: '3',
                label: <span>
                  <img style={{
                        borderRadius: '50%',
                        height: '75px',
                  }} src="3.jpg"/>Third</span>,
            }
          ]
        }}
        label="Select option..."
        placeholder="Choose one..."
        caption={
          <span>
            <b>Required</b> option
          </span>
        }
        type={TYPE.SELECT}
        multiple={true}
        onSelect={this.onSelect}
        overrides={{
          Option: props => <CustomOption>Select {props.children}</CustomOption>,
        }}
      >
      {options}
      </StatefulSelect>
    </React.Fragment>
  );
};
```
