import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function DialogNewItem({ open, setOpen }) {
  return (
    <>
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog">
        DialogNewItem
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          DialogNewItem
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" autoFocus onClick={() => setOpen(false)}>
            Ok
          </Button>
          <Button variant="contained" color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogNewItem