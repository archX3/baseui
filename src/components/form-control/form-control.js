// @flow
import * as React from 'react';
import getBuiId from '../../utils/get-bui-id';
import {getOverride, getOverrideProps} from '../../helpers/overrides';
import {
  Label as StyledLabel,
  Caption as StyledCaption,
} from './styled-components';
import type {FormControlPropsT} from './types';

export default class FormControl extends React.Component<
  FormControlPropsT,
  {},
> {
  static defaultProps = {
    overrides: {},
    label: null,
    caption: null,
    error: false,
    id: getBuiId(),
  };

  getSharedProps = () => {
    const {error, size, disabled, required} = this.props;
    return {
      $disabled: disabled,
      $error: error,
      $size: size,
      $required: required,
    };
  };

  render() {
    const {
      overrides: {Label: LabelOverride, Caption: CaptionOverride},
      id,
      label,
      caption,
      error,
      of: Component,
    } = this.props;

    const sharedProps = this.getSharedProps();

    const Label = getOverride(LabelOverride) || StyledLabel;
    const Caption = getOverride(CaptionOverride) || StyledCaption;
    const Control = this.Component || Component;

    return (
      <React.Fragment>
        {label && (
          <Label
            htmlFor={id}
            {...sharedProps}
            {...getOverrideProps(LabelOverride)}
          >
            {typeof label === 'function' ? label(sharedProps) : label}
          </Label>
        )}
        <Control {...this.props} />
        {(caption || error) && (
          <Caption {...sharedProps} {...getOverrideProps(CaptionOverride)}>
            {error && typeof error !== 'boolean'
              ? typeof error === 'function' ? error(sharedProps) : error
              : typeof caption === 'function' ? caption(sharedProps) : caption}
          </Caption>
        )}
      </React.Fragment>
    );
  }
}
