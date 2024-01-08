import * as React from 'react';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import { styled } from "@mui/material/styles";
import { alternatives, alternativesAdvanced } from '../Config/alternatives';

const MyButton = styled(Button)({
  backgroundColor: "#d7ccc8 !important",
  color: "black !important",
  padding: "1rem !important",
  fontSize: "14px !important"
});

export default function Feedback({report}) {
  return (
    <Container>
      <Grid container spacing={2} textAlign={"center"}>
        <Grid item xs={12}>Attack</Grid> 
        <Grid item xs={4}>Left</Grid>
        <Grid item xs={4}>Center</Grid>
        <Grid item xs={4}>Right</Grid>
        {Object.keys(alternativesAdvanced).map(alternative => (
          <Grid item xs={4} key={alternative}>
            <MyButton
              sx={{width: '100%', fontSize: "20px"}} 
              variant={"outlined"} 
              onClick={()=>report(alternative)}
              >{alternative}</MyButton>
          </Grid>
        ))}
      </Grid>
      </Container> 
  );
}