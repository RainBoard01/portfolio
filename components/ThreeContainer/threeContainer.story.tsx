import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThreeContainer } from './threeContainer';

export default {
  title: 'components/ThreeContainer',
  component: ThreeContainer,
} as ComponentMeta<typeof ThreeContainer>;

const Template: ComponentStory<typeof ThreeContainer> = () => <ThreeContainer />;

export const Default = Template.bind({});
