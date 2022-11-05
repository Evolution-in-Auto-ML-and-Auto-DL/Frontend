import { useRef, useState, useCallback, useMemo } from "react";
import { Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Chip } from '@mantine/core';
import { Box } from '@mantine/core';
import { Title } from '@mantine/core';
import { Button } from '@mantine/core';
import { Text } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { openConfirmModal } from '@mantine/modals';
import { NewProjectComponent } from '../../components/NewProject/NewProjectComponent';
import { Modal, Group } from '@mantine/core';
import { getSession, GetSessionParams } from 'next-auth/react';

function Dashboard(){
  const [Projects, setProjects] = useState([1, 2, 3, 4, 5, 6]);
  const [opened, setOpened] = useState(false);


    const openModal = () => openConfirmModal({
      children: (
        <NewProjectComponent />
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
      centered:true,
      size:"auto",
      transition:'scale',
      exitTransitionDuration:100,
    });


  
  return(
    <Container size="xl">

      <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Introduce yourself!"
        >
          <NewProjectComponent />
      </Modal>

      <Title order={1} style={{textAlign:'center', marginBottom:"20px", fontFamily:"cairo", fontWeight:'normal'}}>Dashboard</Title>

      <Container size="xs" style={{marginBottom:"40px", marginTop:"50px"}}>
        <Button onClick={openModal} style={{fontFamily:"cairo", marginLeft:"80px", marginRight:"120px", fontWeight:500}}>New Project</Button>
        <Button style={{fontFamily:"cairo", fontWeight:500}}>Gallery</Button>
      </Container>

      <Grid gutter="xl" >
        {Projects.map((item) => (
        <Grid.Col span={4} >
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
              textAlign: 'left',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              cursor: 'pointer',
              minHeight: 150,
              fontFamily: "cairo",
              fontWeight: 530,
              fontSize: "20px",

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
              },
            })}
          >
            Project {item}- name
          </Box>

        </Grid.Col>))}
      </Grid>

    </Container>
  )

  }

export default Dashboard;

export async function getServerSideProps(ctx: GetSessionParams) {
  const session = await getSession(ctx);
  return ({
    props: { session },
  });
}