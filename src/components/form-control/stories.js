// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import FormControlReadme from '../../../rfcs/form-control-hoc.md';
import examples from './examples';

//$FlowFixMe

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Form control', module)
    .addDecorator(withReadme(FormControlReadme))
    // $FlowFixMe
    .add(description, example),
);
