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
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from '../index';

describe('StatefulPopover', () => {
  test('basic render', () => {
    function CustomBody() {
      return <span />;
    }

    const props = {
      overrides: {
        Body: CustomBody,
      },
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
      onMouseEnterDelay: 100,
      onMouseLeaveDelay: 200,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      placement: PLACEMENT.topLeft,
      showArrow: true,
      stateReducer: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };

    const component = shallow(
      <StatefulPopover {...props}>
        <span>Hover me</span>
      </StatefulPopover>,
    );

    expect(component).toMatchSnapshot('renders <StatefulContainer/>');

    expect(component.dive()).toMatchSnapshot(
      'renders <Popover/> as child to container',
    );
  });
});
