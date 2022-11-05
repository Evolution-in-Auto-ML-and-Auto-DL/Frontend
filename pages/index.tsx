import { getSession, GetSessionParams } from 'next-auth/react';
import { HeaderMegaMenu } from '../components/Header/Header';
import Dashboard from './dashboard';
// import { AuthenticationTitle } from '../components/Login/Login';

export default function HomePage() {
  return (
    <>
      <HeaderMegaMenu />
      <Dashboard />
    </>
  );
}

export async function getServerSideProps(ctx: GetSessionParams) {
  const session = await getSession(ctx);
  return ({
    props: { session },
  });
}
