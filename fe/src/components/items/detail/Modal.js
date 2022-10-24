import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import axios from 'axios';
import {  useSelector } from 'react-redux'
import { BASE_URL } from '../../../Const';
import { selectSearch } from '../../../store/slices/itemSlice';
import "react-resizable/css/styles.css";
import DetailModal from "./DetailModal";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper square {...props} sx={{ maxWidth: "100vw !important", maxHeight: "100vh !important", }} />
    </Draggable>
  );
}

export default function Modal({ open, setOpen }) {
  const taskId = useSelector(selectSearch);
  const [height, setHeight] = useState(window.innerHeight * 0.9);
  const [width, setWidth] = useState(window.innerWidth * 0.9);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState();

  useEffect(() => {
    axios.post(BASE_URL + "tasks/gettaskid", { taskId: taskId })
      .then(async (res) => {
        setLoading(true);
        setItem(res.data.data)
        await new Promise(resolve => setTimeout(resolve, 50));
        setLoading(false)
      })// eslint-disable-next-line
  }, [taskId])
console.log(item);
  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Resizable
          height={height}
          width={width}
          maxConstraints={[1700, 700]}
          onResize={(event, { element, size }) => {
            setHeight(height + event.movementY);
            setWidth(width + event.movementX);
          }}
        >
          <>
            <DialogContentText height={`${height}px`} width={`${width}px`} component='div' sx={{ position: "relative" }}>
              <DialogTitle style={{ cursor: "move", height: "15px", width: "100%", padding: 0, position: "absolute" }} id="draggable-dialog-title">
              </DialogTitle>
              {!loading && 
                <DetailModal item={item} setOpen={setOpen} />
              }
            </DialogContentText>
          </>
        </Resizable>
      </Dialog>

    </>
  );
}
