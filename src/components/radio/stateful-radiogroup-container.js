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
import {STATE_TYPE} from './constants';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  DefaultStatefulPropsT,
  StateT,
} from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulRadioGroupContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps: DefaultStatefulPropsT = {
    initialState: {
      value: '',
    },
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  constructor(props: StatefulContainerPropsT) {
    super(props);
    const {initialState} = this.props;
    this.state = {
      ...initialState,
    };
  }

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.change, e);
    const {onChange} = this.props;
    onChange && onChange(e);
  };

  stateReducer = (type: string, e: SyntheticInputEvent<HTMLInputElement>) => {
    let nextState = {};
    const {stateReducer} = this.props;
    if (type === STATE_TYPE.change) {
      nextState = {value: e.target.value};
    }
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const {onChange} = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulRadioGroupContainer;
