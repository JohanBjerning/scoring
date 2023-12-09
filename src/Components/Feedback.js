import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const alternatives = [
  "Left attack",
  "Center attack",
  "Right attack",
  "Drop left",
  "Drop center",
  "Drop right",
  "Block left",
  "Block center",
  "Block right",
  "Back spike",
  "Serve ace",
  "Net touch",
  "Unforced error",  
  "Rotation error",
  "Unknown error"
]
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