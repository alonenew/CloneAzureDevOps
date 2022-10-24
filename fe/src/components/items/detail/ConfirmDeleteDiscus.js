import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button
  } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../../Const';

function ConfirmDeleteDiscus({ discusId, open, setOpen }) {
    
    const deleteDiscussion= ()=> {     
        axios.delete(BASE_URL + "tasks/deleteDiscusById", { data: {discusId: discusId} })
            .then(response => {
                if (response.status === 200) {
                setOpen(false)
                // window.location.reload();
        }})
    }
    return (
        <>
            <Dialog open={open} maxWidth="sm" fullWidth>
                <DialogTitle sx={{fontSize: 20, fontWeight: "bold"}}>ยืนยันการลบข้อมูล</DialogTitle>
                <Box position="absolute" top={0} right={0}>
                    <img className="w-3 h-3 m-3 cursor-pointer" src="https://www.svgrepo.com/show/151290/close.svg" alt="" onClick={() => setOpen(false)} />
                </Box>
                <DialogContent>
                    <Typography>คุณกำลังลบข้อมูล ต้องการดำเนินการต่อหรือไม่</Typography>
                </DialogContent>
                <DialogActions>
                    <Button sx={{background: "red"}} onClick={() => setOpen(false)}>
                        ยกเลิก
                    </Button>
                    <Button sx={{background: "green"}} onClick={deleteDiscussion}>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDeleteDiscus