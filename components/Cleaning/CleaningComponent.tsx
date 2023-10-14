import { Group, Button, Box, Grid, Text, Select, Space, Divider, Title } from '@mantine/core';
import { useEffect, useState} from 'react';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { type } from 'os';

const axios = require('axios');

export interface cleaningProps {
    loc: string;
    nextStep: () => void;
}

export function CleaningComponent({loc, nextStep}: cleaningProps) {

    const [ fetchedData, setFetchedData] = useState(false);

    const [categorical, setCategorical] = useState<string[]>([]);
    const [numerical, setNumerical] = useState<string[]>([]);

    const [methods, setMethods] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function sendReq(){
        const url = 'http://172.31.8.56/cleaning_info';
    
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
            let t = [];
            for(let i=0; i<data[0].length; i++)
                t.push('mode');
            for(let i=0; i<data[1].length; i++)
                t.push('mean');
            console.log(t);
            setMethods(t);
            setCategorical(data[0]);
            setNumerical(data[1]);
            setFetchedData(true);
        })};
        sendReq()}, []);
    
    async function clean(){
        setLoading(true);
        const url = 'http://172.31.8.56/cleaning';

        let list = [];

        for(let i=0; i<categorical.length; i++){
            let t = [categorical[i], methods[i]]
            list.push(t);
        }

        for(let i=0; i<numerical.length; i++){
            let t = [numerical[i], methods[i+categorical.length]]
            list.push(t);
        }
    
        const temp = {
          url: loc,
          tags: list
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
        { (categorical.length + numerical.length != 0) ? (
        <>
            <Grid >
                <Grid.Col span={6}>
                <Group position='center'>
                    <Text style={{fontWeight:500}}>
                        Column Name
                    </Text>
                </Group>
                </Grid.Col>
                
                <Grid.Col span={6}>
                <Group position='center'>
                    <Text style={{fontWeight:500}}>
                        Cleaning Method
                    </Text>
                </Group>
                </Grid.Col>
            </Grid>

            <Space h={'xl'}></Space>
            <Divider/>
            <Space h={'xl'}></Space>

            {categorical.map((item, index) => (
                <Grid>
                <Grid.Col span={6}>
                <Group position="left">

                    <Text style={{marginLeft:"170px"}}>
                        {item}
                    </Text>
                </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                <Group position="center">

                    <Select
                        aria-label="Your favorite framework/library"
                        placeholder="Pick one"
                        value={methods[index]}
                        onChange={(newVal) => {
                            console.log('here');
                            let newArr = [...methods];
                            newArr[index] = newVal;
                            setMethods(newArr);
                        }}
                        data={[
                            { value: 'mode', label: 'Mode' },
                            { value: 'ffill', label: 'Forward Fill' },
                            { value: 'bfill', label: 'Backward Fill' },
                        ]}
                        />
                    
                </Group>
                </Grid.Col>
                </Grid>
            ))}

            {numerical.map((item, index) => (
                <Grid>
                <Grid.Col span={6}>
                <Group position="left">

                    <Text style={{marginLeft:"170px"}}>
                        {item}
                    </Text>
                </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                <Group position="center">

                    <Select
                        aria-label="Your favorite framework/library"
                        placeholder="Pick one"
                        value={methods[index + categorical.length]}
                        onChange={(newVal) => {
                            let newArr = [...methods];
                            newArr[index + categorical.length] = newVal;
                            setMethods(newArr);
                        }}
                        data={[
                            { value: 'mean', label: 'Mean' },
                            { value: 'median', label: 'Median' },
                            { value: 'ffill', label: 'Forward Fill' },
                            { value: 'bfill', label: 'Backward Fill' },
                        ]}
                        />
                    
                </Group>
                </Grid.Col>
                </Grid>
            ))}
        </>
        ) : ( 
            <>
            <Group position='center'>
            <Title order={3}> No Columns with null values in the data set</Title>
            </Group>
            <Group position='center'>
            <Text>Go on to the next step </Text>
            </Group>
            </>
        )}
        <Group position='right'>
            <Button onClick={clean} loading={loading}>
                Run
            </Button>
        </Group>
    </Box>
    );
}


