import { Container } from '@mantine/core';
import React from 'react';

export const Layout = ({ children }: { children: any }) => (
  <Container size="xs">voxel{children}footer</Container>
);
