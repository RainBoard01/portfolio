import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  AppShell,
  Container,
  Center,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar/navbar';
import { ThreeContainer } from '../components/ThreeContainer/threeContainer';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps, router } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Yerko Acuña - Homepage</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Yerko's homepage" />
        <meta name="author" content="Yerko Acuña" />
        <meta name="author" content="rainboard" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Yerko Acuña" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rainboard" />
        <meta name="twitter:creator" content="@rainboard" />
        <meta name="twitter:image" content="https://about.yerkoacuna.tk/card.png" />
        <meta property="og:site_name" content="Yerko Acuña" />
        <meta name="og:title" content="Yerko Acuña" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://about.yerkoacuna.tk/card.png" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            headings: {
              fontFamily: "'M PLUS Rounded 1c'",
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <AppShell
              header={<Navbar />}
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.cyan[0],
                },
              })}
            >
              <Container size="xs" pt="60px" pb="16px">
                <ThreeContainer />
                <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0, 0)}>
                  <Component {...pageProps} key={router.pathname} />
                </AnimatePresence>
                <Center
                  sx={(theme) => ({
                    opacity: 0.4,
                    fontSize: theme.fontSizes.sm,
                    textAlign: 'center',
                  })}
                >
                  &copy; {new Date().getFullYear()} Yerko Acuña. All Rights Reserved.
                </Center>
              </Container>
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
