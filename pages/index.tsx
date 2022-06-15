/* eslint-disable react/no-unescaped-entities */
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  List,
  MediaQuery,
  Text,
  Title,
  SimpleGrid,
} from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, BrandGithub, BrandInstagram, Mail } from 'tabler-icons-react';
import { Section } from '../components/Section/section';
import { Article } from '../components/Layout/article';
import { StackList } from '../components/StackList/stackList';

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

const backend = [
  {
    title: 'Language',
    badges: [
      {
        title: 'Node.JS',
        color: 'green',
        enable: true,
        description:
          'Open source cross-platform JavaScript runtime environment that uses the V8 engine.',
        logoPath: '/icons/nodejs.svg',
      },
      {
        title: 'Python',
        color: 'yellow',
        enable: false,
        description:
          'High-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.',
        logoPath: '/icons/python.svg',
      },
    ],
  },
  {
    title: 'Web Framework',
    badges: [
      {
        title: 'Fastify',
        color: 'dark',
        enable: true,
        description:
          'Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture, inspired by Hapi and Express.',
        logoPath: '/icons/fastify.svg',
      },
      {
        title: 'Express',
        color: 'dark',
        enable: true,
        description:
          'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
        logoPath: '/icons/express.svg',
      },
      {
        title: 'FastAPI',
        color: 'cyan',
        enable: false,
        description:
          'FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.',
        logoPath: 'fastapi.svg',
      },
    ],
  },
  {
    title: 'APIs',
    badges: [
      {
        title: 'GraphQL',
        color: 'pink',
        enable: true,
        description:
          'Open source query language & runtime for self-documenting APIs that allow clients to fetch exactly the required data.',
        logoPath: '/icons/graphql.svg',
      },
      {
        title: 'REST',
        color: 'violet',
        enable: true,
        description:
          'REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other.',
        logoPath: '/icons/rest.svg',
      },
    ],
  },
  {
    title: 'DBs',
    badges: [
      {
        title: 'MongoDB',
        color: 'green',
        enable: true,
        description:
          'Open source document database used in many modern web applications. It is classified as a NoSQL database because it does not rely on a traditional table-based relational database structure.',
        logoPath: '/icons/mongodb.svg',
      },
      {
        title: 'MySQL',
        color: 'yellow',
        enable: true,
        description:
          'Open source relational database management system. As with other relational databases, MySQL stores data in tables made up of rows and columns.',
        logoPath: '/icons/mysql.svg',
      },
      {
        title: 'Redis',
        color: 'red',
        enable: false,
        description:
          'Redis is an in-memory key-value store known for its flexibility, performance, and wide language support.',
        logoPath: '/icons/redis.svg',
      },
    ],
  },
];

export default function HomePage(): JSX.Element {
  return (
    <Article title="Homepage">
      <Box
        mb={20}
        p={12}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.rgba('#ffffff', 0.08)
              : theme.fn.rgba('#ffffff', 0.36),
          borderRadius: theme.radius.md,
          backdropFilter: 'blur(10px)',
        })}
      >
        <Text align="center">Hello, I'm an web developer based in Chile!</Text>
      </Box>
      <MediaQuery smallerThan="sm" styles={{ flexDirection: 'column', alignItems: 'center' }}>
        <Group position="apart" align="start">
          <div style={{ alignSelf: 'stretch' }}>
            <Title order={1}>Yerko Acuña</Title>
            <Text>Digital Craftzman ( Musician / Developer / Designer )</Text>
          </div>
          <Image width={100} height={100} src="/images/yerko.png" />
        </Group>
      </MediaQuery>
      <Section delay={0.1}>
        <Title
          order={3}
          sx={{
            textDecorationLine: 'underline',
            textDecorationThickness: '4px',
            textDecorationColor: '#525252',
            textUnderlineOffset: '5px',
            marginBottom: '15px',
          }}
        >
          Work
        </Title>
        <Text align="justify" sx={{ textIndent: '20px' }}>
          Yerko is a freelance and a full-stack developer based in Puerto Montt, Chile with a
          passion for building digital services/stuff he wants. He has a knack for all things
          launching products, from planning and designing all the way to solving real-life problems
          with code. When not online, he loves hanging out with his camera. Currently, he is
          finishing his Software Engineer studies.
        </Text>
        <Container mt={15} size={118} px={0}>
          <Link href="/works" passHref>
            <Button rightIcon={<ChevronRight size={15} />}>My portfolio</Button>
          </Link>
        </Container>
      </Section>
      <Section delay={0.2}>
        <Title
          order={3}
          sx={{
            textDecorationLine: 'underline',
            textDecorationThickness: '4px',
            textDecorationColor: '#525252',
            marginBottom: '15px',
          }}
        >
          My Stack
        </Title>
        <SimpleGrid cols={2} spacing="xs">
          <StackList data={frontend} stack="Frontend" />
          <StackList data={backend} stack="Backend" />
        </SimpleGrid>
      </Section>
      <Section delay={0.3}>
        <Title
          order={3}
          sx={{
            textDecorationLine: 'underline',
            textDecorationThickness: '4px',
            textDecorationColor: '#525252',
            textUnderlineOffset: '5px',
            marginBottom: '15px',
          }}
        >
          I &#10084;
        </Title>
        <Text align="justify" sx={{ textIndent: '20px' }}>
          Music, Games, Playing Piano, Photography, Trekking, Swimming and Table Tennis.
        </Text>
      </Section>
      <Section delay={0.4}>
        <Title
          order={3}
          sx={{
            textDecorationLine: 'underline',
            textDecorationThickness: '4px',
            textDecorationColor: '#525252',
            textUnderlineOffset: '5px',
            marginBottom: '15px',
          }}
        >
          On the web
        </Title>
        <List listStyleType="none">
          <List.Item>
            <Anchor href="https://github.com/rainboard01" target="_blank">
              <Button size="md" variant="subtle" leftIcon={<BrandGithub size={18} />}>
                @rainboard01
              </Button>
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="https://instagram.com/yerkoacuna.h" target="_blank">
              <Button size="md" variant="subtle" leftIcon={<BrandInstagram size={18} />}>
                @yerkoacuna.h
              </Button>
            </Anchor>
          </List.Item>
          <List.Item>
            <Anchor href="mailto:amdmsi4ever@hotmail.com" target="_blank">
              <Button size="md" variant="subtle" leftIcon={<Mail size={18} />}>
                amdmsi4ever@hotmail.com
              </Button>
            </Anchor>
          </List.Item>
        </List>
      </Section>
    </Article>
  );
}
