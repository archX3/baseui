// @flow
import * as React from 'react';
import {Input} from '../input';
import {FormControl} from './';

export const tests = {
  INPUT_EXAMPLE: 'Input control example',
};

export default {
  [tests.INPUT_EXAMPLE]: function example1() {
    return (
      <div>
        <Input
          label="Input label"
          caption="Input caption"
          error="Input error"
        />
        <br />
        <Input label="Input label" caption="Input caption" />
        <br />
        <FormControl
          label={<span>Element type label</span>}
          caption={<span>Element type caption</span>}
          placeholder="Placeholder"
        >
          <Input />
        </FormControl>
      </div>
    );
  },
};
