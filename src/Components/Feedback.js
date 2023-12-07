import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const alternatives = [
  "Kill",
  "Ace",
  "Block",
  "Unforced",
  "Serve miss"
]
export default function Feedback({report}) {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 2,
          width: '100%'
        },        
      }}
    >
      <ButtonGroup
        orientation="vertical"
        variant="text"
      >
        {alternatives.map(alternative => (
          <Button onClick={()=>report(alternative)} sx={{p: 4}} key={alternative}>{alternative}</Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}