import './App.css';
import { Box, Button, Container, Grid, LinearProgress, Toolbar } from '@mui/material'
import { onValue, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { useNavigate } from "react-router-dom";
import live from './live.png'
import InfoIcon from '@mui/icons-material/Info';
import DeleteGame from './Components/DeleteGame';
import DeleteIcon from '@mui/icons-material/Delete';
import ResultTable from './Components/ResultTable';

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

function groupOnDate(data) {
  const groupedData = [];
  Object.keys(data).map(key => {
    const date = data[key].endTime ? formatDate(new Date(data[key].endTime)) : data[key].analyze ? "Ongoing" : "Not played";
    if (!groupedData[date])
      groupedData[date] = [];
    groupedData[date].push({ ...data[key], key: key });
    return "";
  })
  return groupedData;
}

function ListGames({ user, path, setGame }) {
  const [games, setGames] = useState();
  const [streamGame, setStreamGame] = useState();
  const [noGames, setNoGames] = useState(false);
  const [gameToDelete, setGameToDelete] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => {
    setShowDelete(false);
  }

  const handleDelete = (game) => {
    setGameToDelete(game);
    setShowDelete(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const refDb = ref(db, `${path}/`);
    onValue(refDb, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGames(data);
      }
      else {
        setNoGames(true);
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
    navigate(`/analyze/${id}/${path}`);
  }

  const setStreaming = (id) => {
    if (streamGame === id)
      remove(ref(db, `streamGame`));
    else
      set(ref(db, `streamGame`), id);
  }

  if (noGames)
    return <Box sx={{ fontSize: "30px", fontWeight: 800, mt: 3, color: '#fff', textAlign: "center" }}>No games</Box>

  if (!games)
    return <LinearProgress />

  const sortedGames = groupOnDate(games);
  sortedGames.reverse();

  return (
    <Container maxWidth={"md"} sx={{background: path === "history" ? "#fff" : "unset"}}>
      <DeleteGame show={showDelete} handleClose={handleCloseDelete} game={gameToDelete} path={path} />
      {Object.keys(sortedGames).reverse().map(key => (        
        <Box key={key}>           
            <Box sx={{width: '100%', borderBottom: "1px solid #000"}}>{key}</Box>
            {sortedGames[key].map(game =>
            <React.Fragment key={game.key}>
              {path === "history" ? 
                <ResultTable 
                  score={game} 
                  showInfo={user ? () => gameInfo(game.key) : null} 
                  handleDelete={user ? () => handleDelete(game.key) : null}/>
              :
              <Box 
              sx={{ background: key === "Ongoing" ? "#81c784aa" : "#ffffffaa", mt: 1, p: 1, fontSize: "18px", fontWeight: 800, textAlign: "center", borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }}>
              <Grid key={game.key} container className={"scoreboard"} sx={{ mt: 2, borderRadius: '10px' }}>
                {user &&
                  <Grid item xs={6} sx={{ fontSize: "12px", textAlign: "left", borderBottom: "1px solid #fff" }}>
                    <Button
                      variant={"standard"}
                      endIcon={<InfoIcon />}
                      onClick={() => gameInfo(game.key)}
                      sx={{ color: "#fff", borderRadius: "10px !important", p: "2px !important", m: 1 }}>
                      Stats
                    </Button>
                  </Grid>}
                {user &&
                  <Grid item xs={6} sx={{ fontSize: "12px", textAlign: "right", borderBottom: "1px solid #fff" }}>
                    <Button
                      variant={"standard"}
                      endIcon={<DeleteIcon />}
                      onClick={() => handleDelete(game.key)}
                      sx={{ color: "#fff", borderRadius: "10px !important", p: "2px !important", m: 1 }}>
                      Delete
                    </Button></Grid>}
                <Grid item xs={1} className={"scoreboard-inner"}>{game.home.serve && <Box sx={{ fontSize: "25px" }}>🏐</Box>}</Grid>
                <Grid item xs={6} className={"scoreboard-inner"} sx={{ textAlign: "left" }}>{game.home.name}</Grid>
                <Grid item xs={2} className={"scoreboard-inner"}>{game.home.set}</Grid>
                <Grid item xs={3} className={"scoreboard-inner"}><Box className={"scoreboard-score"}>
                  {game.home[game.home.set + game.away.set] ?
                    game.home[game.home.set + game.away.set].score :
                    0}
                </Box></Grid>

                <Grid item xs={1} className={"scoreboard-inner"}>{game.away.serve && <Box sx={{ fontSize: "25px" }}>🏐</Box>}</Grid>
                <Grid item xs={6} className={"scoreboard-inner"} sx={{ textAlign: "left" }}>{game.away.name}</Grid>
                <Grid item xs={2} className={"scoreboard-inner"}>{game.away.set}</Grid>
                <Grid item xs={3} className={"scoreboard-inner"}><Box className={"scoreboard-score"}>
                  {game.away[game.home.set + game.away.set] ?
                    game.away[game.home.set + game.away.set].score :
                    0}

                </Box>
                </Grid>
                <Grid item xs={12} className={"scoreboard-inner"}><Box sx={{ fontSize: "12px" }}>{game.league}</Box></Grid>
                {user && path !== "history" &&
                  <>                    
                    <Grid item xs={10}><Button variant={"contained"} sx={{ width: '100%' }} onClick={() => reportGame(game.key)}>Rapportera</Button></Grid>
                    <Grid item xs={2} sx={{ textAlign: "center" }}>
                      <img alt={"Streaming"} onClick={() => setStreaming(game.key)} className={streamGame !== game.key ? "disabled-image" : "image"} style={{ width: '50px', marginTop: '10px' }} src={live} />
                    </Grid>
                  </>
                }
              </Grid>
              </Box>
              }
              </React.Fragment>
            )}
        </Box>
      ))}
      <Toolbar />
    </Container>
  )
}

export default ListGames