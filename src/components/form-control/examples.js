// @flow
import * as React from 'react';
import {Input, InputControl} from '../input';
import {FormControl} from './';

export const tests = {
  INPUT_EXAMPLE: 'Input control example',
};

export default {
  [tests.INPUT_EXAMPLE]: function example1() {
    return (
      <div>
        <InputControl
          label="Input label"
          caption="Input caption"
          error="Input error"
        />
        <br />
        <InputControl
          label={() => {
            return 'Function type label';
          }}
          caption={() => {
            return 'Function type caption';
          }}
          error={() => {
            return 'Function type error';
          }}
        />
        <br />
        <InputControl label="Input label" caption="Input caption" />
        <br />
        <FormControl
          of={Input}
          label={<span>Element type label</span>}
          caption={<span>Element type caption</span>}
          placeholder="Placeholder"
        />
      </div>
    );
  },
};
