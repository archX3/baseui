// @flow
import * as React from 'react';
import type {OverrideT} from '../../helpers/overrides';
import type {SizeT} from '../input/types';

export type FormControlPropsT = {
  overrides: {
    Label?: OverrideT<*>,
    Caption?: OverrideT<*>,
  },
  label: ?(React.Node | ((props: PropsT) => React.Node)),
  caption: ?(React.Node | ((props: PropsT) => React.Node)),
  error: boolean | React.Node | ((props: PropsT) => React.Node),
  id: string,
  disabled?: boolean,
  required?: boolean,
  size?: SizeT,
};
