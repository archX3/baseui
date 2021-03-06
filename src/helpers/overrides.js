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

export type OverrideObjectT<T> = {|
  component?: ?React.ComponentType<T>,
  props?: ?{},
  style?: ?{},
|};

export type OverrideT<T> = OverrideObjectT<T> | React.ComponentType<T>;

export type OverridesT<T> = {
  [string]: OverrideT<T>,
};

export function getOverride<T>(
  override: ?OverrideT<T>,
): ?React.ComponentType<T> {
  // Check if override is OverrideObjectT
  if (override && typeof override === 'object') {
    // TODO remove this 'any' once this flow issue is fixed:
    // https://github.com/facebook/flow/issues/6666
    // eslint-disable-next-line flowtype/no-weak-types
    return (override: any).component;
  }
  // Otherwise it must be a component type (function or class) or null/undefined
  return override;
}

export function getOverrideProps<T>(override: ?OverrideT<T>) {
  if (override && typeof override === 'object') {
    return {
      // $FlowFixMe
      ...override.props,
      // $FlowFixMe
      $style: override.style,
    };
  }
  return {};
}

/**
 * Coerces an override value into an override object
 * (sometimes it is just an override component)
 */
export function toObjectOverride<T>(override: OverrideT<T>): OverrideT<T> {
  if (typeof override === 'function') {
    return {
      component: (override: React.ComponentType<T>),
    };
  }
  return override;
}

/**
 * Merges two override objects – this is useful if you want to
 * inject your own overrides into a child component, but also
 * accept further overrides from your parent.
 */
export function mergeOverrides<T>(
  target?: OverridesT<T> = {},
  source?: OverridesT<T> = {},
): OverridesT<T> {
  return Object.keys({...target, ...source}).reduce((acc, name) => {
    acc[name] = {
      ...toObjectOverride(target[name]),
      ...toObjectOverride(source[name]),
    };
    return acc;
  }, {});
}
