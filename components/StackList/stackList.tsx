import { DefaultMantineColor, List, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { BadgeList } from '../BadgeList/badgeList';

interface Props {
  data: {
    title: String;
    badges: {
      title: String;
      color: DefaultMantineColor;
      enable: Boolean;
      description: String;
      logoPath: string;
    }[];
  }[];
  stack: String;
}

export const StackList = ({ data, stack }: Props) => (
  <Stack spacing={5}>
    <Title
      order={5}
      sx={{
        textDecorationLine: 'underline',
        textDecorationThickness: '2px',
        textDecorationColor: '#525252',
        textUnderlineOffset: '3px',
      }}
    >
      {stack}
    </Title>
    <List listStyleType="none">
      {data.map((element, key) => (
        <List.Item key={key}>
          <Text size="xs" weight={600}>
            {element.title}
          </Text>
          <BadgeList data={element.badges} />
        </List.Item>
      ))}
    </List>
  </Stack>
);
