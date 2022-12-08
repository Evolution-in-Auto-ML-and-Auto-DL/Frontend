import { Group, Title, TextInput, FileInput, Text, Paper, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';

const axios = require('axios');

export function NewProjectComponent() {

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      dataset: null,
    },
  });

  const formSubmit = async (values) => {
    await axios.post('http://172.105.63.82:8000/upload_dataset_details', {
      name: values.name,
      description: values.description,
      dataset: values.dataset.name,
    });
    const formData = new FormData();
    formData.append('file',values.dataset,values.dataset.name);
    fetch('http://172.105.63.82:8000/upload_dataset', {
      method: "POST",
      body: formData
    })
    closeAllModals();
    window.location.reload();
  };

  return (
    <Paper p="md">
      <form onSubmit={form.onSubmit(formSubmit)}>
      <Group position="center" style={{ marginBottom: '50px' }}>
        <Title order={1} style={{ fontFamily: 'Cairo', fontWeight: 200, color: '#0E76D7' }}>Create new Project</Title>
      </Group>

      <Group position="center" style={{ marginBottom: '50px' }}>

        <Text weight={500} style={{ fontFamily: 'Cairo', marginRight: '20px' }}>
          Project Name
        </Text>

         <TextInput
           placeholder="Enter project name"
           aria-label="Project Name"
           variant="filled"
           style={{ marginRight: '50px', width: '200px' }}
           required
           {...form.getInputProps('name')}
         />

        <Text weight={500} style={{ fontFamily: 'Cairo', marginRight: '20px' }}>
          Project Description
        </Text>

        <TextInput
          placeholder="Enter Project Description"
          aria-label="Project Description"
          variant="filled"
          style={{ marginRight: '50px', width: '200px' }}
          {...form.getInputProps('description')}
        />
      </Group>
      <Group style={{ marginLeft: '35px' }}>

        <Text weight={500} style={{ fontFamily: 'Cairo', marginRight: '58px' }}>
          Dataset
        </Text>

        {/* <DropzoneButton/> */}
        <FileInput placeholder="Upload Dataset" accept="text/csv" {...form.getInputProps('dataset')} />

      </Group>

      <Text weight={500} style={{ fontFamily: 'Cairo', marginTop: '20px', marginBottom: '20px', marginLeft: '450px' }}>
          or
      </Text>

      <Group style={{ marginLeft: '35px' }}>

        <Text weight={500} style={{ fontFamily: 'Cairo', marginRight: '20px' }}>
          Kaggle Link
        </Text>

        <TextInput
          placeholder="Paste link to chosen dataset here"
          aria-label="Project Description"
          variant="filled"
        />
      </Group>
      <Group position="right">
        <Button type="submit">Create</Button>
        <Button onClick={closeAllModals}>Close</Button>
      </Group>
      </form>
    </Paper>
  );
}
