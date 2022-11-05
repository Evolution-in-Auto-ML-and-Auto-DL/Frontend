import { Box, Group, Title, TextInput, FileInput, Text} from '@mantine/core';
import { IconUpload } from '@tabler/icons';

export function NewProjectComponent() {
  return (
    <div style={{width:"800px", height:"400px"}}>
      <Group position="center" style={{marginBottom:"50px"}}>
        <Title order={1} style={{fontFamily:'cairo', fontWeight:200, color:'#0E76D7'}}>Create new Project</Title>
      </Group>
      <Group position="center" style={{marginBottom:"50px"}}>

        <Text weight={500} style={{fontFamily:'Cairo', marginRight:"20px"}}>
          Project Name
        </Text>

         <TextInput
          placeholder="Enter project name"
          aria-label="Project Name"
          variant="filled"
          style={{marginRight:"50px", width:"200px"}}
        />

        <Text weight={500} style={{fontFamily:'Cairo', marginRight:"20px"}}>
          Project Description
        </Text>

        <TextInput
          placeholder="Enter Project Description"
          aria-label="Project Description"
          variant="filled"
          style={{height:'20px'}} 
        />
      </Group>
      <Group style={{marginLeft:"35px"}}>

        <Text weight={500} style={{fontFamily:'Cairo', marginRight:"58px"}}>
          Dataset
        </Text>

        <FileInput
          placeholder="Upload Dataset"
          aria-label="Upload Dataset"
          variant="filled"
          icon={<IconUpload size={14} />}
        />

      </Group>

      <Text weight={500} style={{fontFamily:'Cairo', marginTop:"20px", marginBottom:"20px", marginLeft:"100px"}}>
          or
      </Text>

      <Group style={{marginLeft:"35px"}}>

        <Text weight={500} style={{fontFamily:'Cairo', marginRight:"20px"}}>
          Kaggle Link
        </Text>

        <TextInput
          placeholder="Paste link to chosen dataset here"
          aria-label="Project Description"
          variant="filled"
        />

      </Group>
      
    </div>
    
  );
}