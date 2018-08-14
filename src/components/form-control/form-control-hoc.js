// @flow
import * as React from 'react';
// import getBuiId from '../../utils/get-bui-id';
// import {getOverride, getOverrideProps} from '../../helpers/overrides';
// import {
//   Label as StyledLabel,
//   Caption as StyledCaption,
// } from './styled-components';
// import type {FormControlPropsT} from './types';
import FormControlComponent from './form-control';

export default function asFormControl(Component: React.Component<*>) {
  return class FormControl extends FormControlComponent {
    Component = Component;
  };
}

// export function asFormControlHOC(Component: React.Component<*>) {
//   return class FormControl extends React.Component<FormControlPropsT, {}> {
//     static defaultProps = {
//       overrides: {},
//       label: null,
//       caption: null,
//       error: false,
//       id: getBuiId(),
//     };

//     state = {
//       isFocused: false,
//     };

//     getSharedProps = () => {
//       const {error, size, disabled, required} = this.props;
//       // const {isFocused} = this.state;
//       return {
//         // $isFocused: isFocused,
//         $disabled: disabled,
//         $error: error,
//         $size: size,
//         $required: required,
//       };
//     };

//     render() {
//       const {
//         overrides: {Label: LabelOverride, Caption: CaptionOverride},
//         id,
//         label,
//         caption,
//         error,
//       } = this.props;

//       const sharedProps = this.getSharedProps();

//       const Label = getOverride(LabelOverride) || StyledLabel;
//       const Caption = getOverride(CaptionOverride) || StyledCaption;

//       return (
//         <React.Fragment>
//           {label && (
//             <Label
//               htmlFor={id}
//               {...sharedProps}
//               {...getOverrideProps(LabelOverride)}
//             >
//               {typeof label === 'function' ? label(sharedProps) : label}
//             </Label>
//           )}
//           <Component {...this.props} />
//           {(caption || error) && (
//             <Caption {...sharedProps} {...getOverrideProps(CaptionOverride)}>
//               {error && typeof error !== 'boolean'
//                 ? typeof error === 'function' ? error(sharedProps) : error
//                 : typeof caption === 'function'
//                   ? caption(sharedProps)
//                   : caption}
//             </Caption>
//           )}
//         </React.Fragment>
//       );
//     }
//   };
// }
