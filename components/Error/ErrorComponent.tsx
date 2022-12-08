import { Group, Button, Box, Radio, Text, Select, Space, MultiSelect } from '@mantine/core';
import { useEffect, useState} from 'react';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { type } from 'os';

const axios = require('axios');

export interface errorrops {
    loc: string;
    nextStep: () => void;
}

export function ErrorComponent({loc, nextStep}: errorrops) {

    const [metrics, setMetrics] = useState<string[]>([]);

    const [value, setValue] = useState([]);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function sendReq(){
        const url = 'http://172.105.63.82:8000/fetch_error_metrics';

        const temp = {
            url: loc
        }

        await fetch(url, {method:'POST', mode:'cors', headers: {
            "Content-type": "application/json"
          }, body:JSON.stringify(temp)})
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            console.log(data);
            setMetrics(data);
        })};
        sendReq()}, []);
    
    async function done(){
        setLoading(true);

        const url = 'http://172.105.63.82:8000/error_metrics';
        const model_loc = '/home/athena/Desktop/ATHENA/STORAGE/CurrentModel';


        const temp = {
          url: loc,
          y: 'Happiness Score',
          metrics: value
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

        <>    
        <MultiSelect
        data={metrics}
        label="Metrics"
        placeholder="Pick all that you like"
        value={value} 
        onChange={setValue}
        nothingFound="Loading Metrics"
        />
        <Space h={'xl'}/>
        <Group position='right' >
            <Button onClick={done} loading={loading}>
                Generate Report
            </Button>
        </Group>
        </>
            
        </Box>
    );
}


