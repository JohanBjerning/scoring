import { Grid, Button, LinearProgress, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const [gamePoint, setGamePoint] = useState(0);
  const [receive, setReceive] = useState("neutral");
  const [currentSet, setCurrentSet] = useState();
  const [showDialog, setShowDialog] = useState({ show: false });

  let params = useParams();
  const matchId = params.matchId;

  const handleChange = (event, winner) => {
    setServe(winner);
    setServer(winner, matchId);
  };

  const handleFeedback = (feedback) => {
    if(feedback) {
      console.log(gamePoint)
      set(ref(db, `runningGames/${matchId}/analyze/${currentSet}/${gamePoint}`), 
        { 
          teamPoint: showDialog.point,
          time: new Date().getTime(), 
          feedback: feedback,
          winner: showDialog.team,
          serve: serve,
          receive: receive,
        });
        setServer(showDialog.team, matchId);
        setReceive("neutral");
    }
    else {
      set(ref(db, `runningGames/${matchId}/${showDialog.team}/${currentSet}/score`), increment(-1));
    }
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
        const set = data.away.set + data.home.set;
        setCurrentSet(set)
        setScore(data);
        const pAway = data.away[set] ? data.away[set].score : 0;
        const pHome = data.home[set] ? data.home[set].score : 0;
        setGamePoint(pAway + pHome)
        if (data.home.serve)
          setServe('home');
        else
          setServe('away');
      }
    });
  }, [matchId]);

  console.log(gamePoint)

  const closeGame = () => {
    score.endTime = new Date().getTime();
    set(ref(db, `history/${matchId}`), score);
    remove(ref(db, `runningGames/${matchId}`));
  }

  const scoringHome = () => {
    setShowDialog({ show: true, team: "home", point: score.home[currentSet] ? score.home[currentSet].score + 1 : 1});
    setGamePoint(gamePoint + 1);
    set(ref(db, `runningGames/${matchId}/home/${currentSet}/score`), increment(1));    
  }

  const removeScoringHome = () => {
    if(score.home[currentSet] && score.home[currentSet].score > 0) {
      remove(ref(db, `runningGames/${matchId}/home/analyze/${currentSet}/${score.home[currentSet].score}`))
      set(ref(db, `runningGames/${matchId}/home/${currentSet}/score`), increment(-1));
      setGamePoint(gamePoint - 1);
    }
  }

  const scoringAway = () => {
    setShowDialog({ show: true, team: "away", point: score.away[currentSet] ? score.away[currentSet].score + 1 : 1 });
    setGamePoint(gamePoint + 1);
    set(ref(db, `runningGames/${matchId}/away/${currentSet}/score`), increment(1));
  }

  const removeScoringAway = () => {
    if(score.away[currentSet] && score.away[currentSet].score > 0) {
      remove(ref(db, `runningGames/${matchId}/away/analyze/${currentSet}/${score.away[currentSet].score}`))
      set(ref(db, `runningGames/${matchId}/away/${currentSet}/score`), increment(-1));
      setGamePoint(gamePoint - 1);
    }
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
          {score.home[currentSet] ? score.home[currentSet].score : 0}
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center", pt: '10px', pb: '10px', color: '#fff', background: "#ec407a", fontSize: '30px', fontWeight: '800' }}>
          {score.away[currentSet] ? score.away[currentSet].score : 0}
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <ToggleButtonGroup
            color="secondary"
            value={serve}
            exclusive
            sx={{ minWidth: '100%' }}
            onChange={handleChange}
          >
            <ToggleButton value="home" sx={{ minWidth: '50vw', color: serve === "home" ? "#fff !important" : "", background: serve === "home" ? "#3f51b5 !important" : "unset"}}>Serve {score.home.name}</ToggleButton>
            <ToggleButton value="away" sx={{ minWidth: '50vw', color: serve === "away" ? "#fff !important" : "", background: serve === "away" ? "#ec407a !important" : "unset" }}>Serve  {score.away.name}</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <small>Mottag</small>
          <ToggleButtonGroup
            color="primary"
            exclusive
            onChange={(event, value) => setReceive(value)}
            value={receive}
          >
            <ToggleButton sx={{ fontWeight: "800", minWidth: '33vw', background: receive === "bad" ? "#ef5350 !important" : "unset" }} value="bad">-</ToggleButton>
            <ToggleButton sx={{ fontWeight: "800",  minWidth: '33vw', background: receive === "neutral" ? "#e6ee9c !important" : "unset"  }} value="neutral">0</ToggleButton>
            <ToggleButton sx={{ fontWeight: "800",  minWidth: '33vw', background: receive === "good" ? "#80cbc4 !important" : "unset"  }} value="good">+</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            variant='contained'
            color="home"
            sx={{ minWidth: '95%', minHeight: '200px', fontSize: '30px', mt: '2px' }}
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
            sx={{ minWidth: '95%', minHeight: '200px', fontSize: '30px', mt: '2px' }}
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
        <Grid item xs={12} p={1} sx={{ fontSize: '20px', fontWeight: '800', textAlign: "center" }}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Set {currentSet + 1}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container>
        <Grid item xs={6} sx={{ height: "35px", textAlign: "center", pt: '2px', pb: '2px', color: '#fff', background: "#3f51b5", fontSize: '20px', fontWeight: '800' }}>
          {score.home.set}
        </Grid>
        <Grid item xs={6} sx={{ height: "35px", textAlign: "center", pt: '2px', pb: '2px', color: '#fff', background: "#ec407a", fontSize: '20px', fontWeight: '800' }}>
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
        </AccordionDetails>
      </Accordion>              
        </Grid>        
      </Grid>
      <BottomBar closeGame={closeGame}/>
    </ThemeProvider>
  )
}

export default Scoring