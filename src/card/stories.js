import React from 'react';
import glamorous from 'glamorous';

import {storiesOf} from '@storybook/react';

import {Card, CardContent, CardFloatingMedia, CardMedia} from './index';

const Text = glamorous.div({
  fontWeight: 'bold',
  fontSize: '20px',
  color: '#333',
  lineHeight: 1.4,
  marginBottom: '12px',
});

const Paragraph = glamorous.div({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.7,
  color: '#5f5f5f',
  marginBottom: '16px',
  ':last-child': {
    marginBottom: 0,
  },
});

const Link = glamorous.a({
  color: '#1B6DE0',
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
});

const Button = glamorous.div({
  background: '#1B6DE0',
  fontSize: '14px',
  lineHeight: 1.7,
  fontWeight: 500,
  cursor: 'pointer',
  borderRadius: '4px',
  padding: '12px',
  textAlign: 'center',
  color: '#fff',
  ':hover': {
    background:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)), #1B6DE0;',
  },
});

const ThinCard = ({children}) => (
  <Card css={{maxWidth: '328px'}}>{children}</Card>
);

storiesOf('Card', module)
  .add('Headline & Text', () => (
    <Card>
      <CardContent>
        <Text>Card Title Entry</Text>
        <Paragraph>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus
          cursus. Etiam semper luctus sem ac blandit.
        </Paragraph>
      </CardContent>
    </Card>
  ))
  .add('Text w/ Link', () => (
    <ThinCard>
      <CardContent>
        <Text>Card Title Entry</Text>
        <Paragraph>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus
          cursus. Etiam semper luctus sem ac blandit.
        </Paragraph>
        <Link href="https://www.uber.com">Link to a Place</Link>
      </CardContent>
    </ThinCard>
  ))
  .add('Text w/ Button', () => (
    <ThinCard>
      <CardContent>
        <Text>Card Title Entry</Text>
        <Paragraph>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus
          cursus. Etiam semper luctus sem ac blandit.
        </Paragraph>
        <Button>Button label</Button>
      </CardContent>
    </ThinCard>
  ))
  .add('Text w/ Thumbnail', () => (
    <ThinCard>
      <CardContent>
        <CardFloatingMedia>
          <img src="http://placekitten.com/g/90/90" alt="kitten" />
        </CardFloatingMedia>
        <Text>Card Title Entry</Text>
        <Paragraph>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus
          cursus. Etiam semper luctus sem ac blandit.
        </Paragraph>
        <Button>Button label</Button>
      </CardContent>
    </ThinCard>
  ))
  .add('Text w/ Image', () => (
    <ThinCard>
      <CardMedia>
        <img
          src="http://placekitten.com/g/328/180"
          alt="kitten"
          style={{display: 'block'}}
        />
      </CardMedia>
      <CardContent>
        <Text>Card Title Entry</Text>
        <Paragraph>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus
          cursus. Etiam semper luctus sem ac blandit.
        </Paragraph>
        <Button>Button label</Button>
      </CardContent>
    </ThinCard>
  ));
