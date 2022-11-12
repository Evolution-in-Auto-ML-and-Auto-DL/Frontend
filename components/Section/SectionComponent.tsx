import {Box, Text, Group, Button, Space} from '@mantine/core';
import { useState } from 'react';

export type sectionProps = {
    sectionName: string
}

export function Section({sectionName}: sectionProps) {

    return (
        <Box
            sx={(theme) => ({
            backgroundColor: '#A3D2FF',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            color: 'black',
            })}>
            <Text style={{fontWeight:500}}>
                {sectionName}
            </Text>

            <Space h='md'/>

            <Group position='right'>

                <Button>
                    Configure
                </Button>
                
                <Button>
                    Run
                </Button>

            </Group>

        </Box>
    );
}