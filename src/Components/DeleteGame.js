import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';
import { Button } from '@mui/material';

function DeleteGame({show, game, handleClose, path}) {

  const handleDeleteGame = () => {
    remove(ref(db, `${path}/${game}`));
    handleClose();
  }

  return (
    <Dialog
    open={show}
    onClose={handleClose}
  >
    <DialogTitle id="alert-dialog-title">
      {"Delete?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete the game? This can't be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Avbryt</Button>
      <Button onClick={handleDeleteGame} autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default DeleteGame