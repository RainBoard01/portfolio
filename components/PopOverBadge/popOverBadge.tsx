import {
  DefaultMantineColor,
  Popover,
  Text,
  Badge,
  useMantineColorScheme,
  Image,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';

interface Props {
  title: String;
  color: DefaultMantineColor;
  enable: Boolean;
  description: String;
  logoPath: string;
  key: React.Key;
}

export const PopOverBadge: React.FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="top"
      placement="center"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      transition="pop"
      width={300}
      styles={{ body: { pointerEvents: 'none' }, target: { height: '20px' } }}
      target={
        props.enable ? (
          <Badge
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            variant="outline"
            color={props.color}
            key={props.key}
          >
            {props.title}
          </Badge>
        ) : colorScheme === 'dark' ? (
          <Badge
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            variant="dot"
            color="dark"
            key={props.key}
          >
            {props.title}
          </Badge>
        ) : (
          <Badge
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            variant="dot"
            color="gray"
            key={props.key}
          >
            {props.title}
          </Badge>
        )
      }
    >
      <Title mb={10} order={5}>
        {props.title}
      </Title>
      <div style={{ display: 'flex' }}>
        <Image src={props.logoPath} width={40} height={40} sx={{ minWidth: 40 }} mr="sm" />
        <Text size="sm">{props.description}</Text>
      </div>
    </Popover>
  );
};
