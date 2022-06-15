import { DefaultMantineColor, Group } from '@mantine/core';
import React from 'react';
import { PopOverBadge } from '../PopOverBadge/popOverBadge';

interface Props {
  data: {
    title: String;
    color: DefaultMantineColor;
    enable: Boolean;
    description: String;
    logoPath: string;
  }[];
}

export const BadgeList = ({ data }: Props) => (
  <Group spacing={5} mb={8} mt={-5}>
    {data.map((element, index) => (
      <PopOverBadge {...element} key={index} />
    ))}
  </Group>
);
