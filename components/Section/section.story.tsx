import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Section } from './section';

export default {
  title: 'components/Section',
  component: Section,
  argTypes: {
    numberOfChildren: { control: { type: 'number', min: 0, max: 20, step: 1 } },
  },
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args}>
    {Array.from(Array(args.numberOfChildren).keys()).map((number) => (
      <div
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: '#ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        {number}
      </div>
    ))}
  </Section>
);

export const Empty = Template.bind({});
Empty.args = {
  delay: 0.1,
};

export const Default = Template.bind({});
Default.args = {
  delay: 0,
  numberOfChildren: 5,
};

export const Delay = Template.bind({});
Delay.args = {
  delay: 1,
  numberOfChildren: 2,
};
