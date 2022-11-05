import { getSession, GetSessionParams } from 'next-auth/react';

export default function create() {
    return (
        <div>
            TT
        </div>
    )
}

export async function getServerSideProps(ctx: GetSessionParams) {
    const session = await getSession(ctx);
    return ({
      props: { session },
    });
  }