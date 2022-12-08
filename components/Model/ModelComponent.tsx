import { Group, Button, Box, Radio, Text, Select, Space, Divider } from '@mantine/core';
import { useEffect, useState} from 'react';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { type } from 'os';

const axios = require('axios');

export interface cleaningProps {
    loc: string;
    nextStep: () => void;
}

export function ModelComponent({loc, nextStep}: cleaningProps) {

    const [pipelines, setPipelines] = useState<string[]>([]);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function sendReq(){
        const url = 'http://172.105.63.82:8000/evalml_info';
    
        const temp = {
          url: loc,
          y: 'Happiness Score'
        }
    
        await fetch(url, {method:'POST', mode:'cors', headers: {
          "Content-type": "application/json"
        }, body:JSON.stringify(temp)})
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            setPipelines(data);
        })};
        sendReq()}, []);
    
      async function build(){
        setLoading(true);
        const url = 'http://172.105.63.82:8000/evalml_run';
        const model_loc = '/home/athena/Desktop/ATHENA/STORAGE/CurrentModel';


        const temp = {
          url: loc,
          y: 'Happiness Score'
        }
    
        await fetch(url, {method:'POST', mode:'cors', headers: {
          "Content-type": "application/json"
        }, body:JSON.stringify(temp)})
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
        setLoading(false);
        nextStep();
    }

    return (
    <Box
        sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        })}
    >
        {pipelines.length > 0 ? (
          <>
        <Radio.Group
        name="pipeline"
        orientation="vertical"
        aria-label="Select your favorite framework/library"
        description="Choose pipeline"
        withAsterisk
        >
          <Divider/>
            {pipelines.map((item, index) => (
                <>
                <Radio value={index.toString()} label={item} />
                <Divider/>
                </>
            ))}
        </Radio.Group>

        

        <Group position='right' >
            <Button onClick={build} loading={loading}>
                Run
            </Button>
        </Group>
        </>
        ):(
          <Group position='center'>
            <Text>
              Loading Pipelines
            </Text>
          </Group>
        )}
        
    </Box>
    );
}


