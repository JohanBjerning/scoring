import './App.css';
import { Box, Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { db, ref } from './firebase';

function Scoreboard() {
  const [score, setScore] = useState();
  const [game, setGame] = useState();
  const [noGame, setNoGame] = useState(false);

  useEffect(() => {
    if(!game)
      return;
    const refDb = ref(db, `runningGames/${game}`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setScore(data);
      }
    });
  }, [game]);

  useEffect(() => {
    const refDb = ref(db, 'streamGame/');
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGame(data);
        setNoGame(false);
      }
      else {
        setNoGame(true);
      }
    });
  }, []);

  if(noGame)
    return (
      <Box className={"app"}>
        <Box className={"App-header"}>
          <Box className={"App-logo"}>
            <p>Ingen streaming just nu! </p>
            <p>- Lunds VK -</p>
          </Box>
        </Box>        
      </Box>
    )

  if(!score)
    return <LinearProgress />

  const homeScore = score.home[score.home.set + score.away.set] ? score.home[score.home.set + score.away.set].score : 0;
  const awayScore = score.away[score.home.set + score.away.set] ? score.away[score.home.set + score.away.set].score : 0;

  return (
    <Grid container className={"scoreboard"} sx={{width: "400px", m: 2, borderRadius: '10px'}}>
      <Grid item xs={1} className={"scoreboard-inner"}>{score.home.serve && <Box sx={{fontSize: "25px"}}>🏐</Box>}</Grid>
      <Grid item xs={6} className={"scoreboard-inner"} sx={{textAlign: "left"}}>{score.home.name}</Grid>
      <Grid item xs={2} className={"scoreboard-inner"}>{score.home.set}</Grid>
      <Grid item xs={3} className={"scoreboard-inner"}><Box className={"scoreboard-score"}>{homeScore}</Box></Grid>

      <Grid item xs={1} className={"scoreboard-inner"}>{score.away.serve && <Box sx={{fontSize: "25px"}}>🏐</Box>}</Grid>
      <Grid item xs={6} className={"scoreboard-inner"} sx={{textAlign: "left"}}>{score.away.name}</Grid>
      <Grid item xs={2} className={"scoreboard-inner"}>{score.away.set}</Grid>
      <Grid item xs={3} className={"scoreboard-inner"}><Box className={"scoreboard-score"}>{awayScore}</Box></Grid>
    </Grid>
  );
}

export default Scoreboard;
