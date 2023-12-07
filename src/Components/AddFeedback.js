import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Feedback from './Feedback';

export default function AddFeedback({open, handleClose}) {

  return (
    <div>
      <Dialog 
        onClose={handleClose} 
        open={open}>
        <DialogTitle>Hur vanns bollen?</DialogTitle>
        <Feedback report={handleClose} />
      </Dialog>
    </div>
  );
}