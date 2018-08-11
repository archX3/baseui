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

class StatefulSelectContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps: DefaultStatefulPropsT = {
    initialState: {
      selectedOptions: [],
      textValue: '',
    },
    stateReducer: defaultStateReducer,
    onSelect: () => {},
    onKeyUp: () => {},
    onUnSelect: () => {},
    onClearAll: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props: StatefulContainerPropsT) {
    super(props);
    const {initialState} = this.props;
    this.state = {
      ...initialState,
    };
  }

  onSelect = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    this.stateReducer(STATE_TYPE.select, e, params);
    const {onSelect} = this.props;
    onSelect && onSelect(e, params);
  };

  onUnSelect = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    this.stateReducer(STATE_TYPE.unselect, e, params);
    const {onUnSelect} = this.props;
    onUnSelect && onUnSelect(e, params);
  };

  onClearAll = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    this.stateReducer(STATE_TYPE.clearAll, e, params);
    const {onClearAll} = this.props;
    onClearAll && onClearAll(e, params);
  };

  onKeyUp = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    this.stateReducer(STATE_TYPE.keyUp, e, params);
    const {onKeyUp} = this.props;
    onKeyUp && onKeyUp(e, params);
  };

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    const {onMouseEnter} = this.props;
    onMouseEnter && onMouseEnter(e, params);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    const {onMouseLeave} = this.props;
    onMouseLeave && onMouseLeave(e, params);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    const {onFocus} = this.props;
    onFocus && onFocus(e, params);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>, params: any = {}) => {
    const {onBlur} = this.props;
    onBlur && onBlur(e, params);
  };

  stateReducer = (type: string, e: SyntheticInputEvent<HTMLInputElement>, params: any) => {
    const nextState = {
      selectedOptions: params.selectedOptions,
      textValue: params.textValue,
    };
    const {stateReducer} = this.props;
    const newState = stateReducer(type, nextState, this.state, e, params);
    this.setState(newState);
  };

  render() {
    const {
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const {
      onSelect,
      onUnSelect,
      onMouseEnter,
      onKeyUp,
      onClearAll,
      onMouseLeave,
      onFocus,
      onBlur
    } = this;
    return children({
      ...rest,
      ...this.state,
      onSelect,
      onUnSelect,
      onKeyUp,
      onClearAll,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }
}

export default StatefulSelectContainer;
