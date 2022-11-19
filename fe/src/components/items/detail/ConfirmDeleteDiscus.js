import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
                <Box position="absolute" top={0} right={0} padding={2}>
                    <img className="icon-onclick" src="https://www.svgrepo.com/show/151290/close.svg" alt="" onClick={() => setOpen(false)} />
                </Box>
                <DialogContent>
                    <Typography>คุณกำลังลบข้อมูล ต้องการดำเนินการต่อหรือไม่</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={() => setOpen(false)}>
                        ยกเลิก
                    </Button>
                    <Button variant="contained" color="success" onClick={deleteDiscussion}>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDeleteDiscus