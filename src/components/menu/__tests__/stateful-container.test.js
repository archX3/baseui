// @flow
/* eslint-env browser */
import React from 'react';
import {mount} from 'enzyme';
import StatefulContainer from '../stateful-container';
import {KEY_STRINGS, STATE_CHANGE_TYPES} from '../constants';
import {scrollItemIntoView} from '../utils';

jest.mock('../utils');

const mockItems = [{label: 'item1'}, {label: 'item2'}];
const mockGetItemLabel = item => item.label;
const mockChildrenFn = jest.fn().mockImplementation(() => <div />);
const mockItemSelect = jest.fn();

const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;

function getSharedProps() {
  return {
    items: mockItems,
    getItemLabel: mockGetItemLabel,
    onItemSelect: mockItemSelect,
    children: mockChildrenFn,
    stateReducer: jest
      .fn()
      .mockImplementation((changeType, changes) => changes),
  };
}

describe('Menu StatefulContainer', () => {
  beforeAll(() => {
    // $FlowFixMe
    document.addEventListener = jest.fn();
    // $FlowFixMe
    document.removeEventListener = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // $FlowFixMe
    document.addEventListener = originalAddEventListener;
    // $FlowFixMe
    document.removeEventListener = originalRemoveEventListener;
  });

  test('renders and passes required props to children function', () => {
    const props = {
      items: mockItems,
      getItemLabel: mockGetItemLabel,
      onItemSelect: mockItemSelect,
      children: mockChildrenFn,
    };
    const component = mount(<StatefulContainer {...props} />);
    expect(component.instance().refList).toEqual([]);
    expect(component.instance().rootRef).toEqual(React.createRef());
    expect(mockChildrenFn.mock.calls[0][0]).toEqual({
      highlightedIndex: -1,
      items: mockItems,
      getItemLabel: mockGetItemLabel,
      rootRef: React.createRef(),
      getRequiredItemProps: component.instance().getRequiredItemProps,
    });
  });

  test('with initialState', () => {
    const props = {
      ...getSharedProps(),
      initialState: {
        highlightedIndex: 5,
      },
    };
    const component = mount(<StatefulContainer {...props} />);
    expect(component.state('highlightedIndex')).toBe(5);
  });

  test('add and remove event listeners', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    expect(document.addEventListener.mock.calls.length).toBe(1);
    component.unmount();
    expect(document.removeEventListener.mock.calls.length).toBe(1);
  });

  test('getRequiredItemProps returns correct props', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    const item = mockItems[0];
    const props = component.instance().getRequiredItemProps(item, 0);
    expect(props).toEqual({
      key: 'item1-0',
      ref: React.createRef(),
      isHighlighted: false,
      onClick: props.onClick,
      role: 'option',
      'aria-activedescendant': false,
    });
    props.onClick();
    expect(mockItemSelect.mock.calls[0][0]).toEqual(item);
  });

  test('getRequiredItemProps returns correct props for active child', () => {
    const component = mount(<StatefulContainer {...getSharedProps()} />);
    component.setState({
      highlightedIndex: 0,
    });
    const item = mockItems[0];
    const props = component.instance().getRequiredItemProps(item, 0);
    expect(props).toEqual({
      key: 'item1-0',
      ref: React.createRef(),
      isHighlighted: true,
      onClick: props.onClick,
      role: 'option',
      'aria-activedescendant': true,
    });
  });

  test('onKeyDown - handleArrowKey', () => {
    const props = getSharedProps();
    const component = mount(<StatefulContainer {...props} />);
    expect(component.state('highlightedIndex')).toEqual(-1);

    component.instance().refList = [React.createRef(), React.createRef()];
    component.instance().onKeyDown({
      key: KEY_STRINGS.ArrowUp,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });
    expect(component.state('highlightedIndex')).toEqual(0);
    expect(props.stateReducer.mock.calls[0]).toEqual([
      STATE_CHANGE_TYPES.moveUp,
      {highlightedIndex: 0},
      {highlightedIndex: -1},
    ]);
    // $FlowFixMe
    expect(scrollItemIntoView.mock.calls[0][0]).toEqual({
      node: React.createRef(),
      parentNode: React.createRef(),
      isFirst: true,
      isLast: false,
    });

    component.instance().onKeyDown({
      key: KEY_STRINGS.ArrowDown,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });
    expect(component.state('highlightedIndex')).toEqual(1);
    expect(props.stateReducer.mock.calls[1]).toEqual([
      STATE_CHANGE_TYPES.moveDown,
      {highlightedIndex: 1},
      {highlightedIndex: 0},
    ]);
  });

  test('onKeyDown - handleEnterKey', () => {
    const props = getSharedProps();
    const component = mount(<StatefulContainer {...props} />);
    const event = {
      key: KEY_STRINGS.Enter,
      preventDefault: jest.fn(),
    };
    component.instance().onKeyDown(event);
    expect(mockItemSelect.mock.calls.length).toBe(0);

    component.setState({
      highlightedIndex: 0,
    });
    component.instance().onKeyDown(event);
    expect(mockItemSelect.mock.calls[0]).toEqual([mockItems[0], event]);
  });
});
