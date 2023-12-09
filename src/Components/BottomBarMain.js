import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LoginIcon from '@mui/icons-material/Login';
import HistoryIcon from '@mui/icons-material/History';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'; 
import CloseGame from './CloseGame';

export default function BottomBarMain({user, setGame}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const nav = useLocation();

  const scoring = nav.pathname ? nav.pathname.includes("scoring") : "";
  const matchId = nav.pathname ? nav.pathname.split(/\//).pop() : "";
  const create = nav.pathname ? nav.pathname.includes("games") : "";

  const handleCloseGame = () => {
    setOpen(false);   
    navigate(`analyze/${matchId}/history`)
  }

  const doCloseGame = () => {
    setOpen(true);
  }

  const handleNavigation = (nav) => {
    switch(nav) {
      case "back":
        navigate(-1);
        break;
      case "live":
        navigate('/games/runningGames');
        break;
      case "history":
        navigate('/games/history');
        break;
      case "create":
        navigate('/create');
          break;
      case "stats":
        navigate(`analyze/${matchId}/runningGames`)
        break;
      case "quit":
        doCloseGame();
        break;
      case "login":
      default:
        navigate(`/login`);
        break;
    }
  }

  return (
    <>
    <CloseGame game={matchId} handleClose={handleCloseGame} show={open} />
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>    
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
      >        
        <BottomNavigationAction 
          icon={<ArrowBackIcon />} 
          value="back" 
          />
        <BottomNavigationAction 
          label="Live" 
          icon={<LiveTvIcon />} 
          value="live" 
          />
        <BottomNavigationAction 
          label="History" 
          icon={<HistoryIcon />} 
          value="history" 
          />
        {scoring &&
          <BottomNavigationAction 
          label="Quit game" 
          icon={<AddCircleIcon />} 
          value="quit" 
          />
        }      
        {scoring &&
          <BottomNavigationAction 
          label="Stats" 
          icon={<InfoIcon />} 
          value="stats" 
          />
        }    
        {user && !scoring && create && <BottomNavigationAction 
          label="Create game" 
          icon={<AddCircleIcon />} 
          value="create" 
          />}
        {!user && <BottomNavigationAction 
          label="Logga in" 
          icon={<LoginIcon />} 
          value="login" 
          />}
      </BottomNavigation>
    </Paper>
    </>
  );
}