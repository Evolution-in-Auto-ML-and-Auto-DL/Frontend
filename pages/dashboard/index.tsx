import { useRef, useState, useCallback, useMemo } from 'react';
import { Container, Stack , Pagination} from '@mantine/core';
import { Grid } from '@mantine/core';
import { Space } from '@mantine/core';
import { Box } from '@mantine/core';
import { Title } from '@mantine/core';
import { Button } from '@mantine/core';
import { Text } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { openModal } from '@mantine/modals';
import { NewProjectComponent } from '../../components/NewProject/NewProjectComponent';
import { Modal, Group } from '@mantine/core';

function Dashboard({ props }) {
  const [Projects, setProjects] = useState([1, 2, 3, 4, 5, 6]);
  const [opened, setOpened] = useState(false);
  

  const projects = props.projects

  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState((projects.length / 6) + 1);

  const openNewModal = () =>
    openModal({
      children: <NewProjectComponent />,
      // labels: { confirm: 'Confirm', cancel: 'Cancel' },
      // onCancel: () => console.log('Cancel'),
      // onConfirm: () => console.log('Confirmed'),
      centered: true,
      size: 'auto',
      transition: 'scale',
      exitTransitionDuration: 100,
    });

  console.log('Projects', projects);

  return (
    <Container size="xl">
      <Title
        order={1}
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'cairo',
          fontWeight: 'normal',
        }}
      >
        Dashboard
      </Title>

      <Container size="xs" style={{ marginBottom: '40px', marginTop: '50px' }}>
        <Button
          onClick={openNewModal}
          style={{ fontFamily: 'cairo', marginLeft: '80px', marginRight: '120px', fontWeight: 500 }}
        >
          New Project
        </Button>
        <Button style={{ fontFamily: 'cairo', fontWeight: 500 }}>Gallery</Button>
      </Container>

      {projects?.length > 0 ? (
         <Grid gutter="xl">
         {projects.slice((activePage - 1) * 6, activePage * 6 ).map((item) => (
           <Grid.Col span={4}>
             <Box
               sx={(theme) => ({
                 backgroundColor:
                   theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
                 textAlign: 'left',
                 padding: theme.spacing.xl,
                 borderRadius: theme.radius.md,
                 cursor: 'pointer',
                 minHeight: 150,
                 fontFamily: 'cairo',
                 fontWeight: 530,
                 fontSize: '20px',
 
                 '&:hover': {
                   backgroundColor:
                     theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                 },
               })}
             >
               <Stack>
                <Text>Project {item.id} - {item.name}</Text>
                <Text fz="md">{item.description}</Text>
                <Button component="a" href={"/project/"+item.id}>Open Project</Button>
               </Stack>
               
             </Box>
           </Grid.Col>
         ))}
       </Grid>
      ) : (
        <Grid gutter="xl">
          {Projects.slice(activePage * 6, activePage * 6 + 6).map((item) => (
            <Grid.Col span={4}>
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
                  textAlign: 'left',
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  cursor: 'pointer',
                  minHeight: 150,
                  fontFamily: 'cairo',
                  fontWeight: 530,
                  fontSize: '20px',

                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                  },
                })}
              >
                Project {item}
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      )}

      <Space h={'xl'}></Space>

      <Group position='center'>
        <Pagination page={activePage} onChange={setPage} total={totalPages} />
      </Group>
    </Container>
  );
}

export default Dashboard;

export async function getStaticProps() {
  const res = await fetch('http://172.105.63.82:8000/projects', {
    method: 'GET',
  });
  const projects = await res.json();

  return {
    props: {
      projects,
    },
  };
}
