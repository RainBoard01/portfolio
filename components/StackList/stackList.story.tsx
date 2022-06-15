import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { StackList } from './stackList';

export default {
  title: 'components/StackList',
  component: StackList,
} as ComponentMeta<typeof StackList>;

const Template: ComponentStory<typeof StackList> = (args) => <StackList {...args} />;

const frontend = [
  {
    title: 'JS Frameworks',
    badges: [
      {
        title: 'NextJS',
        color: 'dark',
        enable: true,
        description: 'Open source framework for server-rendered or statically-exported React apps.',
        logoPath: '/icons/nextjs-light.svg',
      },
      {
        title: 'React',
        color: 'blue',
        enable: true,
        description:
          'Open source library for reactively rendering user interfaces using declarative components.',
        logoPath: '/icons/react.svg',
      },
      {
        title: 'Gatsby',
        color: 'pink',
        enable: false,
        description:
          'Open source framework based on React for create apps with static-site-generation.',
        logoPath: '/icons/gatsby.svg',
      },
    ],
  },
  {
    title: 'State Management',
    badges: [
      {
        title: 'react-query',
        color: 'red',
        enable: true,
        description:
          'Powerful asynchronous state management, server-state utilities and data fetching for TS/JS, React, Solid, Svelte and Vue.',
        logoPath: '/icons/react-query.svg',
      },
      {
        title: 'redux',
        color: 'violet',
        enable: false,
        description:
          'Predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments and are easy to test.',
        logoPath: '/icons/redux.svg',
      },
    ],
  },
  {
    title: 'UI Libraries',
    badges: [
      {
        title: 'Mantine UI',
        color: 'blue',
        enable: true,
        description:
          'A fully featured React components library. With dark-mode and theming support. Includes more than 120 customizable components and hooks for you.',
        logoPath: '/icons/mantineui.svg',
      },
      {
        title: 'Chakra UI',
        color: 'cyan',
        enable: true,
        description:
          'Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.',
        logoPath: '/icons/chakraui.svg',
      },
    ],
  },
  {
    title: 'CSS Frameworks',
    badges: [
      {
        title: 'Emotion',
        color: 'pink',
        enable: true,
        description:
          'CSS-in-JS library designed for high performance style composition. It allows you to style apps quickly with string or object styles.',
        logoPath: '/icons/emotion.svg',
      },
      {
        title: 'Tailwind',
        color: 'blue',
        enable: true,
        description:
          'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
        logoPath: '/icons/tailwind.svg',
      },
    ],
  },
  {
    title: 'Mobile',
    badges: [
      {
        title: 'React Native',
        color: 'blue',
        enable: false,
        description:
          "React Native brings React's declarative UI framework to iOS and Android. With React Native, you use native UI controls and have full access to the native platform.",
        logoPath: '/icons/react.svg',
      },
    ],
  },
  {
    title: 'Desktop',
    badges: [
      {
        title: 'Tauri',
        color: 'yellow',
        enable: false,
        description:
          'Tauri is a framework for building tiny, blazingly fast binaries for all major desktop platform. Developers can integrate any front-end framework that compiles to HTML, CSS and JS for building their user interface.',
        logoPath: '/icons/tauri.svg',
      },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  data: frontend,
  stack: 'Frontend',
};
