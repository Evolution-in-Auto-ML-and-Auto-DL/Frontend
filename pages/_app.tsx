import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { getSession, GetSessionParams, SessionProvider as AuthProvider } from 'next-auth/react';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Athena</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/lightning.svg" />
      </Head>

      <AuthProvider session={session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
              <NotificationsProvider>
                <Component {...pageProps} />
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </AuthProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export async function getServerSideProps(ctx: GetSessionParams) {
  const session = await getSession(ctx);
  return ({
    props: { session },
  });
}