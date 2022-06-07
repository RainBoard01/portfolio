import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navbar } from './navbar';

export default {
  title: 'components/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const Default = Template.bind({});
