import './App.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { onValue, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateGame from './Components/CreateGame';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useNavigate } from "react-router-dom";
import live from './live.png'

function ListGames({ user, path, setGame }) {
  const [runningGames, setRunningGames] = useState();
  const [streamGame, setStreamGame] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const refDb = ref(db, `${path}/`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRunningGames(data);
      }
    });
  }, [path]);

  useEffect(() => {
    const refDb = ref(db, `streamGame/`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStreamGame(data);
      }
      else {
        setStreamGame(null);
      }
    });
  }, []);

  const reportGame = (id) => {
    navigate(`/scoring/${id}`);
  }

  const gameInfo = (id) => {
    setGame(id, path);
  }

  const setStreaming = (id) => {
    if (streamGame === id)
      remove(ref(db, `streamGame`));
    else
      set(ref(db, `streamGame`), id);
  }

  return (
    <Container maxWidth={"xs"}>
      {user &&
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>Skapa ny match</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreateGame />
          </AccordionDetails>
        </Accordion>
      }
      {runningGames && Object.keys(runningGames).map(key =>
        <Grid container className={"scoreboard"} sx={{ mt: 2, borderRadius: '10px' }} key={key} onClick={() => gameInfo(key)}>
          <Grid item xs={1} className={"scoreboard-inner"}>{runningGames[key].home.serve && <Box sx={{ fontSize: "25px" }}>🏐</Box>}</Grid>
          <Grid item xs={6} className={"scoreboard-inner"} sx={{ textAlign: "left" }}>{runningGames[key].home.name}</Grid>
          <Grid item xs={2} className={"scoreboard-inner"}>{runningGames[key].home.set}</Grid>
          <Grid item xs={3} className={"scoreboard-inner"}><Box className={"scoreboard-score"}>
            {runningGames[key].home[runningGames[key].home.set + runningGames[key].away.set] ?
              runningGames[key].home[runningGames[key].home.set + runningGames[key].away.set].score :
              0}
          </Box></Grid>

          <Grid item xs={1} className={"scoreboard-inner"}>{runningGames[key].away.serve && <Box sx={{ fontSize: "25px" }}>🏐</Box>}</Grid>
          <Grid item xs={6} className={"scoreboard-inner"} sx={{ textAlign: "left" }}>{runningGames[key].away.name}</Grid>
          <Grid item xs={2} className={"scoreboard-inner"}>{runningGames[key].away.set}</Grid>
          <Grid item xs={3} className={"scoreboard-inner"}><Box className={"scoreboard-score"}>
            {runningGames[key].away[runningGames[key].home.set + runningGames[key].away.set] ?
              runningGames[key].away[runningGames[key].home.set + runningGames[key].away.set].score :
              0}

          </Box>
          </Grid>
          {user &&
            <>
              <Grid item xs={5}><Button variant={"contained"} sx={{ width: '100%' }} color={"error"}>Ta bort</Button></Grid>
              <Grid item xs={5}><Button variant={"contained"} sx={{ width: '100%' }} onClick={() => reportGame(key)}>Rapportera</Button></Grid>
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <img alt={"Streaming"} onClick={() => setStreaming(key)} className={streamGame !== key ? "disabled-image" : "image"} style={{ width: '50px', marginTop: '10px' }} src={live} />
              </Grid>
            </>
          }
        </Grid>
      )}

    </Container>
  )
}

export default ListGames