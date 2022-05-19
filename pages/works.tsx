import { Badge, Card, Group, Image, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import React from 'react';
import { Section } from '../components/Section/section';

const Works = () => {
  const theme = useMantineTheme();
  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Section delay={0}>
      <Title
        order={3}
        sx={{
          textDecorationLine: 'underline',
          textDecorationThickness: '4px',
          textDecorationColor: '#525252',
          textUnderlineOffset: '5px',
          marginBottom: '25px',
        }}
      >
        Works
      </Title>
      <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 'sm' }]}>
        <div>
          <Card shadow="sm" p="lg">
            <Card.Section>
              <Image src="./image.png" height={160} alt="Norway" />
            </Card.Section>

            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Text weight={500}>Color Picker</Text>
              <Badge color="blue" variant="light">
                React
              </Badge>
              <Badge color="pink" variant="light">
                GraphQL
              </Badge>
            </Group>

            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>
          </Card>
        </div>
        <div>
          <Card shadow="sm" p="lg">
            <Card.Section>
              <Image src="./image.png" height={160} alt="Norway" />
            </Card.Section>

            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
              <Text weight={500}>Dinamac.cl Shop</Text>
              <Badge color="blue" variant="light">
                Wordpress
              </Badge>
              <Badge color="violet" variant="light">
                WooCommerce
              </Badge>
            </Group>

            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>
          </Card>
        </div>
      </SimpleGrid>
    </Section>
  );
};

export default Works;
