import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { child, get, ref, remove, set } from 'firebase/database';
import { db } from '../firebase';
import { Button } from '@mui/material';

function CloseGame({ show, game, handleClose }) {

  const closeGame = () => {
    const endTime = new Date().getTime();
    get(child(ref(db), `runningGames/${game}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        data.endTime = endTime;
        set(ref(db, `history/${game}`), data);
        remove(ref(db, `runningGames/${game}`));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });    
    handleClose();
  }

  return (
    <Dialog
      open={show}
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
        <Button onClick={closeGame} autoFocus>
          Avsluta matchen
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CloseGame