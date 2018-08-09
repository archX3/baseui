// @flow
import {styled} from '../../styles';
import {withStyle} from 'styletron-react';
import {ICON} from './constants';

import {
  StyledInputContainer,
  StyledInput,
  StyledRoot,
} from '../input';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const InputRoot = withStyle(StyledRoot, props => {
  return {
    cursor: 'pointer',
  };
});

export const Input = withStyle(StyledInput, props => {
  return {
    width: 'auto',
    flexGrow: '1',
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
  return {
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
    case ICON.CLEAR_TAG:
    case ICON.LOOP:
    default:
      return {};
  }
});

export const DropDown = styled('ul', props => {
  const {$theme} = props;
  return {
    width: '96%',
    position: 'absolute',
    padding: '16px',
    listStyle: 'none',
    borderRadius: '8px',
    boxShadow: $theme.lighting.shadow600,
  };
});

export const Option = styled('li', props => {
  const {$selected} = props;
  return {
    padding: '8px',
    color: $selected ? '#276EF1' : null,
  };
});
