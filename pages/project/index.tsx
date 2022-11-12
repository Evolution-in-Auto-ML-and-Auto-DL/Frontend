import { useRef, useState, useCallback, useMemo } from "react";
import { Container } from '@mantine/core';
import { Space } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Box } from '@mantine/core';
import { Title } from '@mantine/core';
import { Button } from '@mantine/core';
import { Text } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { openConfirmModal } from '@mantine/modals';
import { Section, sectionProps } from '../../components/Section/SectionComponent';
import { Modal, Group } from '@mantine/core';
import { getSession, GetSessionParams } from 'next-auth/react';
import * as React from 'react';

function Project(){
  const sections = ['Data Cleaning', 'Feature Engineering', 'Model', 'Metrics']
  const [projectName, setProjectName] = useState(['Project Name']); 

  return(
        <Container size="md">

            <Title order={2}>
                {projectName}
            </Title>

            <Space h='lg'></Space>

            <Grid>

                {sections.map((item) => (
                    <Grid.Col span={6}>
                        <Section sectionName={item} />
                    </Grid.Col>
                ))}    
                    
            </Grid>

            <Space h='lg'></Space>

            <Group position="right">

                <Button>
                    Download
                </Button>

            </Group>

        </Container>

  )

}

export default Project;

export async function getServerSideProps(ctx: GetSessionParams) {
    const session = await getSession(ctx);
    return ({
      props: { session },
    });
  }