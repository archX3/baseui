// @flow
import {styled} from '../../styles';
import {withStyle} from 'styletron-react';
import {ICON, TYPE} from './constants';
import {Menulist, StyledList} from '../menulist';

import {
  StyledInputContainer,
  StyledInput,
  StyledRoot,
  SIZE,
} from '../input';
import {getInputStyles} from '../input/styled-components';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const InputRoot = withStyle(StyledRoot, props => {
  return {};
});

export const Input = withStyle(StyledInput, props => {
  return {
    cursor: 'pointer',
    width: 'auto',
    flexGrow: '1',
    ':hover': {
      cursor: 'pointer',
    },
  };
});

export const InputContainer = withStyle(StyledInputContainer, props => {
  return {
    flexWrap: 'wrap',
    padding: '5px',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    borderColor: '#276EF1',
  };
});

export const Tag = styled('span', props => {
  const {
    $multiple
  } = props;
  return $multiple
    ? {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        margin: '5px',
        borderWidth: '1px',
        borderColor: '#276EF1',
        color: '#276EF1',
        borderRadius: '7px',
        lineHeight: '24px',
        backgroundColor: '#EDF3FE',
      }
    : {
        ...getInputStyles({...props, $size: SIZE.default, $disabled: true}),
        cursor: 'pointer',
        width: 'auto',
        flexGrow: '1',
        ':hover': {
          cursor: 'pointer',
        },
      };
});

export const SearchIcon = styled('img', props => {
  switch (props.$type) {
    case ICON.CLEAR_ALL:
      return {
        marginLeft: 'auto',
        position: 'absolute',
        right: '10px',
      };
    case ICON.SELECT:
      return {
        marginRight: '12px',
      };
    case ICON.SELECTED:
      return {
        paddingRight: '8px',
      };
    case ICON.CLEAR_TAG:
    case ICON.LOOP:
    default:
      return {};
  }
});

export const DropDown = withStyle(StyledList, props => {
  const {$theme, $isOpen, $type} = props;
  return {
    top: $type === TYPE.SELECT ? '40px' : null,
    display: !$isOpen ? 'none' : null,
    width: '96%',
    position: 'absolute',
    padding: '16px',
    listStyle: 'none',
    borderRadius: '8px',
    boxShadow: $theme.lighting.shadow600,
  };
});

export const Option = styled('li', props => {
  const {$selected, disabled, $theme} = props;
  const {colors: {mono700}} = $theme;
  return {
    ':hover': {
      cursor: disabled ? 'not-allowed' : 'text',
    },
    padding: $selected ? '8px 0px' : '8px 18px',
    color: disabled ? mono700 : $selected ? '#276EF1' : null,
  };
});
