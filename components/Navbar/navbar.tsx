import {
  Anchor,
  Burger,
  Group,
  Header,
  MediaQuery,
  Menu,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import Router from 'next/router';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export const Navbar = (): JSX.Element => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Header
      height={60}
      pt="xs"
      pb="xs"
      fixed
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? '#1a1b1e80' : '#ffffff40',
        backdropFilter: 'blur(10px)',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Group
        position="apart"
        align="center"
        sx={{
          width: theme.breakpoints.sm,
        }}
      >
        <Group>
          <Link href="/" passHref>
            <Title
              order={4}
              ml={10}
              mr={20}
              sx={{
                letterSpacing: '-0.5px',
                cursor: 'pointer',
                '@media (max-width: 768px)': {
                  paddingLeft: 24,
                },
              }}
            >
              Yerko Acuña
            </Title>
          </Link>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group position="left" spacing={8}>
              <Link href="/works" passHref>
                <Anchor
                  component="a"
                  sx={{
                    padding: 8,
                    textUnderlineOffset: 3,
                    cursor: 'pointer',
                    color:
                      theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[7],
                  }}
                >
                  Works
                </Anchor>
              </Link>
              <Link href="/source" passHref>
                <Anchor
                  component="a"
                  sx={{
                    padding: 8,
                    textUnderlineOffset: 3,
                    cursor: 'pointer',
                    color:
                      theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[7],
                  }}
                >
                  Source
                </Anchor>
              </Link>
            </Group>
          </MediaQuery>
        </Group>
        <Group>
          <ColorSchemeToggle />
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Menu
              opened={opened}
              onClose={() => setOpened(false)}
              control={
                <Burger
                  opened={opened}
                  onClick={() => setOpened(!opened)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              }
            >
              <Menu.Item>About</Menu.Item>
              <Menu.Item>Works</Menu.Item>
              <Menu.Item>Source</Menu.Item>
            </Menu>
          </MediaQuery>
        </Group>
      </Group>
    </Header>
  );
};
