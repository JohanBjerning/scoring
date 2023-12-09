import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { child, push, ref, update } from 'firebase/database';
import React, { useState } from 'react'
import { db } from './firebase';
import { useNavigate } from "react-router-dom";

function CreateGame() {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [league, setLeague] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    const newPostKey = push(child(ref(db), 'runningGames')).key;
    const updates = {};
    updates['runningGames/' + newPostKey] = {
      league: league,
      home: {
        name: home,
        score: 0,
        set: 0
      },
      away: {
        name: away,
        score: 0,
        set: 0
      }
    };    
    update(ref(db), updates);
    navigate(`/scoring/${newPostKey}`);
  }

  return (
    <Container maxWidth={"xs"} sx={{background: "#fff"}}>
    <Box sx={{fontSize: '20px', textAlign: "center", pt: 2}}>Create new game</Box>
    <Grid 
      container 
      sx={{mt: 4}}
      spacing={4}>
      <Grid 
        item 
        xs={4} 
        sx={{ textAlign: "right" }}>
        Home team
      </Grid>
      <Grid item xs={8}>
        <TextField 
          value={home}
          onChange={(e) => setHome(e.currentTarget.value)}
          variant="standard" />
      </Grid>
      <Grid 
        item 
        xs={4} 
        sx={{ textAlign: "right" }}>
        Away team
      </Grid>
      <Grid 
        item 
        xs={8}>
        <TextField 
          value={away}
          onChange={(e) => setAway(e.currentTarget.value)}
          variant="standard" />
      </Grid>
      <Grid 
        item 
        xs={4} 
        sx={{ textAlign: "right" }}>
          League
      </Grid>
      <Grid 
        item 
        xs={8}>
        <TextField 
          value={league}
          onChange={(e) => setLeague(e.currentTarget.value)}
          variant="standard" />
      </Grid>
      <Grid 
        item 
        xs={12}>
        <Button 
          sx={{ m: 4 }}
          onClick={submit}>
          Skapa match
        </Button>
      </Grid>
    </Grid>
    </Container>
  )
}

export default CreateGame