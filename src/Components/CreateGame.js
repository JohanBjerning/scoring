import { Button, Grid, TextField } from '@mui/material'
import { child, push, ref, update } from 'firebase/database';
import React, { useState } from 'react'
import { db } from '../firebase';

function CreateGame() {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");

  const submit = () => {
    const newPostKey = push(child(ref(db), 'runningGames')).key;
    const updates = {};
    updates['runningGames/' + newPostKey] = {
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
    return update(ref(db), updates);
  }

  return (
    <Grid 
      container 
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
        xs={12}>
        <Button 
          sx={{ m: 4 }}
          onClick={submit}>
          Skapa match
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateGame