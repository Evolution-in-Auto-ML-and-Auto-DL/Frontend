import { Group, Button, Box, Radio, Text, Select, Space, MultiSelect, Title, Divider } from '@mantine/core';
import { useEffect, useState} from 'react';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { type } from 'os';
import { SP } from 'next/dist/shared/lib/utils';

const axios = require('axios');

export interface errorrops {
    loc: string;
    nextStep: () => void;
}

export function ReportsComponent() {

    const [reports, setReports] = useState({});

    useEffect(() => {
        async function sendReq(){
        const url = 'http://172.31.8.56/reports';
    
    
        await fetch(url, {method:'GET', mode:'cors'})
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            console.log(data);
            setReports(data);
        })};
        sendReq()}, []);

    return (
        <Box
            sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            })}
        >
            <>
            <Title order={2}>
                Reports 
            </Title>
            <Divider/>

            <Space h={'xl'}/>

            
                {Object.entries(reports).map((item) => (
                    <Text>
                        <>
                        {item[0]} : {item[1]} 
                        </>
                    </Text>
                ))}


            </>
            
            
        </Box>
    );
}


