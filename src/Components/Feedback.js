import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { alternatives } from '../Config/alternatives';

export default function Feedback({report}) {
  return (
      <Grid container spacing={2} textAlign={"center"}>
        {alternatives.map(alternative => (
          <Grid item xs={4} key={alternative}>
            <Button
              sx={{width: '100%', fontSize: "20px"}} 
              variant={"outlined"} 
              onClick={()=>report(alternative)}
              >{alternative}</Button>
          </Grid>
        ))}
      </Grid>
  );
}