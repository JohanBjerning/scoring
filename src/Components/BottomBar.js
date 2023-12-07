import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export default function BottomBar({closeGame}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleCloseGame = () => {
    closeGame();
    setOpen(false);
    navigate(`/games`);
  }; 

  const handleNavigation = (nav) => {
    if(nav)
      setOpen(true);
    else
      navigate(`/games`);
  }

  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Avsluta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Är du säker på att du vill avsluta matchen, detta kan inte ångras.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Avbryt</Button>
          <Button onClick={handleCloseGame} autoFocus>
            Avsluta matchen
          </Button>
        </DialogActions>
      </Dialog>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>    
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
      >
        <BottomNavigationAction label="All matcher" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Avsluta match" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
    </>
  );
}