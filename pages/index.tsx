import { Button, Card, Container, Group, MediaQuery, Text, Title } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@modulz/radix-icons';
import { Section } from '../components/Section/section';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Card mb={6} radius="lg">
        <Text align="center">Hello, I'm an web developer based in Chile!</Text>
      </Card>
      <MediaQuery smallerThan="sm" styles={{ flexDirection: 'column' }}>
        <Group position="apart" align="start">
          <div>
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
          <Link href="/works">
            <Button rightIcon={<ChevronRightIcon />}>My portfolio</Button>
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
          On the web
        </Title>
        <Text align="justify" sx={{ textIndent: '20px' }}>
          asd
        </Text>
      </Section>
    </>
  );
}
