import { HeaderMegaMenu } from '../components/Header/Header';
import Dashboard from './dashboard';
import Project from './project';

export default function HomePage({projects}) {
  return (
    <>
      <HeaderMegaMenu/>
      <Dashboard props={{projects}}/>
    </>
  );
  }

  export async function getServerSideProps() {
    const res = await fetch('http://172.31.8.56/projects', {
      method: 'GET',
    });
    const projects = await res.json();
  
    return {
      props: {
        projects,
      },
    };
  }
