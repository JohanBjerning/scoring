import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function BottomBarMain({user, setGame}) {
  const navigate = useNavigate();

  const handleNavigation = (nav) => {
    if(nav)
      setGame();
    else
      navigate(`/login`);
  }

  return (
    <>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>    
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
      >
        {!user && <BottomNavigationAction label="Logga in" icon={<RestoreIcon />} />}
        <BottomNavigationAction label="Alla matcher" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
    </>
  );
}