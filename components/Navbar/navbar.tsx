import { Anchor, Burger, Group, Header, MediaQuery, Menu, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export const Navbar = (): JSX.Element => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Header height={60} p="xs">
      <Group position="apart">
        <Group>
          <Link href="/" passHref>
            <Anchor component="a">Yerko Acuña</Anchor>
          </Link>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group>
              <Link href="/works" passHref>
                <Anchor component="a">Works</Anchor>
              </Link>
              <Link href="/source" passHref>
                <Anchor component="a">Source</Anchor>
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
