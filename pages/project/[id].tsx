import { useRef, useState, useCallback, useMemo } from "react";
import { Container } from '@mantine/core';
import { Space } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Text } from '@mantine/core';
import { Title } from '@mantine/core';
import { Button } from '@mantine/core';
import { Stepper } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { CleaningComponent} from '../../components/Cleaning/CleaningComponent';
import {ModelComponent} from '../../components/Model/ModelComponent';
import {ErrorComponent} from '../../components/Error/ErrorComponent';
import {ReportsComponent} from '../../components/Reports/ReportsComponent';
import { Modal, Group } from '@mantine/core';
import * as React from 'react';
import { HeaderMegaMenu } from '../../components/Header/Header';
import next from "next";

function Project({projects}){
  const sections = ['Data Cleaning', 'Feature Engineering', 'Model', 'Metrics']
  const [projectName, setProjectName] = useState(['Project Name']); 

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [final, setFinal] = useState([]);

  return(
    <>
    <HeaderMegaMenu/>
    
        <Container size="md">

            <Title order={2}>
                {projects?.name==null?projectName:projects.name}
            </Title>

            <Space h='sm'></Space>

            <Text>
                {projects?.description==null?projectName:projects.description}
            </Text>

            <Space h='lg'></Space>
            <Space h='lg'></Space>

            <Stepper active={active} onStepClick={setActive} breakpoint="sm">

                <Stepper.Step label="Data Cleaning" description="Dealing with null values">
                    <CleaningComponent loc={projects.location} nextStep={nextStep}/>
                </Stepper.Step>

                <Stepper.Step label="Model Building" description="Choose best Pipeline">
                    <ModelComponent loc={projects.location} nextStep={nextStep}/>
                </Stepper.Step>

                <Stepper.Step label="Error Metrics" description="Meaure loss">
                  <ErrorComponent loc={projects.location} nextStep={nextStep}/>
                </Stepper.Step>

                <Stepper.Completed>
                  <ReportsComponent/>
                </Stepper.Completed>
            </Stepper>
            
        </Container>
        </>

  )

}

export default Project;

export async function getServerSideProps(context) {
  
  // const router = useRouter()
  const { id } = context.query
  
  const res = await fetch('http://172.105.63.82:8000/project/'+id, {
    method: 'GET',
  });
  const projects = await res.json();

  return {
    props: {
      projects,
    },
  };
}