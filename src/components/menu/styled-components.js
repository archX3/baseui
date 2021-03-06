// @flow
import {styled} from '../../styles';

import type {ThemeT} from '../../styles';

type StyledPropsT = {
  $theme: ThemeT,
};

type StyledListItemPropsT = {
  $isHighlighted: boolean,
} & StyledPropsT;

export const List = styled('ul', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  background: $theme.colors.white,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
  paddingTop: $theme.sizing.scale200,
  paddingBottom: $theme.sizing.scale200,
  paddingLeft: $theme.sizing.scale400,
  paddingRight: $theme.sizing.scale400,
}));

export const ListItem = styled(
  'li',
  ({$theme, $isHighlighted}: StyledListItemPropsT) => ({
    ...$theme.typography.font400,
    position: 'relative',
    display: 'block',
    color: $isHighlighted ? $theme.colors.primary : $theme.colors.black,
    margin: 0,
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': {
      color: $theme.colors.primary400,
    },
  }),
);
