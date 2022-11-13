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

  export async function getStaticProps() {
    const res = await fetch('http://194.195.119.85:8000/projects', {
      method: 'GET',
    });
    const projects = await res.json();
  
    return {
      props: {
        projects,
      },
    };
  }
