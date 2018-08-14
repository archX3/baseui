# Form Control

### Exports

* `FormControlHOC`
* `StyledRoot`
* `StyledLabel`
* `StyledCaption`
* `SIZE`

### Form Control API

* Any property of a form control
* `overrides: {Label, Caption, [...otherFormControlOverrides]}` - Optional
  * `Label: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
  * `Caption: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
    Overrides for presentational components.
* `label: node | function` - Optional
  A label rendered above the input field.
* `caption: node | function` - Optional
  A caption rendered below the input field.
* `error: boolean | node | function` - Optional
  Error state of the input. If a string or node element is passed it will be rendered in place of caption as an error message.

### Presentational components props API

Next properties are passed to every presentational (styled) component that form control is composed of:

* `$disabled: boolean`
* `$error: boolean | node`
* `$size: 'default' | 'compact'`
* `$required: boolean`
* `$theme: theme`

### Usage

```javascript
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';

export default () => {
  return (
    <div>
      <InputControl
        label="Input label"
        caption="Input caption"
        error="Input error"
      />
      <FormControl label="Input label" caption="Input caption" caption>
        <Input />
      </FormControl>
      <FormControl label="Input label" caption="Input caption" error>
        <Input />
      </FormControl>
    </div>
  );
};
```
