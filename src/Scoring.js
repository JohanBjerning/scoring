import { Grid, Button, LinearProgress, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { increment, onValue, remove, set } from 'firebase/database';
import { db, ref } from './firebase';
import AddFeedback from './Components/AddFeedback';
import { useParams } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';
import BottomBar from './Components/BottomBar';

const homeBase = '#303f9f';
const homeMain = alpha(homeBase, 0.7);

const awayBase = '#d81b60';
const awayMain = alpha(awayBase, 0.7);

const greyBase = '#b0bec5';
const greyMain = alpha(greyBase, 0.7);

const theme = createTheme({
  palette: {
    home: {
      main: homeMain,
      light: alpha(homeBase, 0.5),
      dark: alpha(homeBase, 0.9),
      contrastText: getContrastRatio(homeMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    away: {
      main: awayMain,
      light: alpha(awayBase, 0.5),
      dark: alpha(awayBase, 0.9),
      contrastText: getContrastRatio(awayMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    grey: {
      main: greyMain,
      light: alpha(greyBase, 0.5),
      dark: alpha(greyBase, 0.9),
      contrastText: getContrastRatio(greyMain, '#fff') > 4.5 ? '#fff' : '#111',
    }
  },
});

const setServer = (newServer, matchId) => {
  if (newServer === 'home') {
    set(ref(db, `runningGames/${matchId}/away/serve`), false);
    set(ref(db, `runningGames/${matchId}/home/serve`), true);
  }
  else {
    set(ref(db, `runningGames/${matchId}/away/serve`), true);
    set(ref(db, `runningGames/${matchId}/home/serve`), false);
  }
}

function Scoring() {
  const [score, setScore] = useState();
  const [serve, setServe] = useState('home');
  const [showDialog, setShowDialog] = useState({ show: false });
  let params = useParams();
  const matchId = params.matchId;

  const handleChange = (event, winner) => {
    setServe(winner);
    setServer(winner, matchId);
  };

  const handleFeedback = (feedback) => {
    set(ref(db, `runningGames/${matchId}/${showDialog.team}/analyze/${showDialog.point}`), { time: new Date().getTime(), feedback: feedback });
    setShowDialog({ show: false });
  }

  const setSet = (team, value) => {
    set(ref(db, `runningGames/${matchId}/${team}/set`), increment(value));
  }

  useEffect(() => {
    const refDb = ref(db, `runningGames/${matchId}`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setScore(data);
        if (data.home.serve)
          setServe('home');
        else
          setServe('away');
      }
    });
  }, [matchId]);

  const closeGame = () => {
    score.endTime = new Date().getTime();
    set(ref(db, `history/${matchId}`), score);
    remove(ref(db, `runningGames/${matchId}`));
  }

  const scoringHome = () => {
    setShowDialog({ show: true, team: "home", point: score.home.score + 1 });
    set(ref(db, `runningGames/${matchId}/home/score`), increment(1));
    setServer('home', matchId);
  }

  const removeScoringHome = () => {
    remove(ref(db, `runningGames/${matchId}/home/analyze/${score.home.score}`))
    set(ref(db, `runningGames/${matchId}/home/score`), increment(-1));
  }

  const scoringAway = () => {
    setShowDialog({ show: true, team: "away", point: score.away.score + 1 });
    set(ref(db, `runningGames/${matchId}/away/score`), increment(1));
    setServer('away', matchId);
  }

  const removeScoringAway = () => {
    set(ref(db, `runningGames/${matchId}/away/score`), increment(-1));
  }

  if (!score)
    return <LinearProgress />

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={'scoring'} sx={{ background: '#e8eaf6' }}>
        <AddFeedback open={showDialog.show} handleClose={handleFeedback} />
        <Grid item xs={6} sx={{ textAlign: "center", background: "#303f9f", pt: '10px', fontSize: '14px', color: '#fff' }}>Home</Grid>
        <Grid item xs={6} sx={{ textAlign: "center", background: "#d81b60", pt: '10px', fontSize: '14px', color: '#fff' }}>Away</Grid>
        <Grid item xs={6} sx={{ textAlign: "center", background: "#303f9f", fontSize: '30px', color: '#fff' }}>{score.home.name}</Grid>
        <Grid item xs={6} sx={{ textAlign: "center", background: "#d81b60", fontSize: '30px', color: '#fff' }}>{score.away.name}</Grid>
        <Grid item xs={6} sx={{ textAlign: "center", pt: '10px', pb: '10px', color: '#fff', background: "#3f51b5", fontSize: '30px', fontWeight: '800' }}>
          {score.home.score}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center", pt: '10px', pb: '10px', color: '#fff', background: "#ec407a", fontSize: '30px', fontWeight: '800' }}>
          {score.away.score}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant='contained'
            color="home"
            sx={{ minWidth: '95%', minHeight: '30vh', fontSize: '30px', mt: '4px' }}
            onClick={scoringHome}>
            +
          </Button>
          <Button
            variant='contained'
            color='grey'
            sx={{ minWidth: '95%', fontSize: '20px', mt: '5px' }}
            onClick={removeScoringHome}
          >
            -
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant='contained'
            color="away"
            sx={{ minWidth: '95%', minHeight: '30vh', fontSize: '30px', mt: '4px' }}
            onClick={scoringAway}>
            +
          </Button>
          <Button
            variant='contained'
            color='grey'
            sx={{ minWidth: '95%', fontSize: '20px', mt: '5px' }}
            onClick={removeScoringAway}
          >
            -
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <ToggleButtonGroup
            color="secondary"
            value={serve}
            exclusive
            sx={{ minWidth: '100%' }}
            onChange={handleChange}
          >
            <ToggleButton value="home" sx={{ minWidth: '50vw' }}>Serve {score.home.name}</ToggleButton>
            <ToggleButton value="away" sx={{ minWidth: '50vw' }}>Serve  {score.away.name}</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} p={2} sx={{ fontSize: '20px', fontWeight: '800', textAlign: "center" }}>
          Set
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center", pt: '10px', pb: '10px', color: '#fff', background: "#3f51b5", fontSize: '30px', fontWeight: '800' }}>
          {score.home.set}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center", pt: '10px', pb: '10px', color: '#fff', background: "#ec407a", fontSize: '30px', fontWeight: '800' }}>
          {score.away.set}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant='contained'
            color="home"
            sx={{ minWidth: '95%', fontSize: '30px', mt: '4px' }}
            onClick={() => setSet("home", 1)}>
            +
          </Button>
          <Button
            variant='contained'
            color='grey'
            sx={{ minWidth: '95%', fontSize: '30px', mt: '5px' }}
            onClick={() => setSet("home", -1)}>
            -
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant='contained'
            color="away"
            sx={{ minWidth: '95%', fontSize: '30px', mt: '4px' }}
            onClick={() => setSet("away", 1)}>
            +
          </Button>
          <Button
            variant='contained'
            color='grey'
            sx={{ minWidth: '95%', fontSize: '30px', mt: '5px' }}
            onClick={() => setSet("away", -1)}>
            -
          </Button>
        </Grid>
      </Grid>
      <BottomBar closeGame={closeGame}/>
    </ThemeProvider>
  )
}

export default Scoring