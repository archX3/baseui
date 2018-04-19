import React from 'react';
import glamorous from 'glamorous';

const Card = glamorous.div({
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
});

const CardContent = glamorous.div({
  padding: '24px',
});

const CardMedia = glamorous.div({});

const CardFloatingMedia = glamorous.div({
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '4px',
    background: '#eee',
    minWidth: '90px',
    minHeight: '90px',
  },
  props => {
    return {
      float: props.float === 'left' ? 'left' : 'right',
      margin: props.float === 'left' ? '0 12px 12px 0' : '0 0 12px 12px',
    };
  }
);

export {
  Card,
  CardContent,
  CardMedia,
  CardFloatingMedia
};