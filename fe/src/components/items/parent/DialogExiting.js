import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import buddhistEra from 'dayjs/plugin/buddhistEra'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { useDispatch } from 'react-redux';
import { addRelataion, clearRelation } from '../../../store/slices/relationSlice';

function DialogExiting({ item, items, open, setOpen }) {
  dayjs.extend(buddhistEra)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [valueToLink, setValueToLink] = useState();
  const [linkType, setLinkType] = useState("Child");
  let showLinkTo = null;

  if (items) {
    showLinkTo = items.find(item => {
      return item.taskId === valueToLink
    })
  }

  const handleClose=()=>{
    dispatch(clearRelation());
    setOpen(false);
    setLinkType("Child");
    setValueToLink(null);
  }

  const handleSubmit=(taskId)=>{
    dispatch(addRelataion({taskId,linkType, valueToLink}))
    setOpen(false);
    setLinkType("Child");
    setValueToLink(null);
  }

  return (
    <>
      <Dialog
        open={open}
        fullWidth
      >
        <DialogTitle>
          Add link
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            You are adding a link from:
          </Typography>
          <Box sx={{ marginY: 1 }} >
            <div className='flex items-center'>
              <img src="https://www.svgrepo.com/show/69769/pin.svg" className="w-5 h-5 mb-4" alt="" />
              <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mx-2" alt="" />
              <Typography variant="body2" className='text-sm cursor-pointer underline' onClick={() => navigate('/detail/id='+item.taskId, { replace: true, state: {item} })}>
                {item.name}
              </Typography>
            </div>
            <div className='ml-6 '>
              <Typography variant="caption" className='flex items-center' >
                Updated {dayjs(item.updateDate).locale('th').format('DD/MM/BBBB')},
                {item.status === "New" ? <><div className={`w-3 h-3 rounded-full bg-slate-400 mb-1 mx-1`}></div>{item.status}</> : null}
                {item.status === "Active" ? <><div className={`w-3 h-3 rounded-full bg-blue-600 mb-1 mx-1`}></div>{item.status}</> : null}
                {item.status === "Resolved" ? <><div className={`w-3 h-3 rounded-full bg-blue-600 mb-1 mx-1`}></div>{item.status}</> : null}
                {item.status === "Closed" ? <><div className={`w-3 h-3 rounded-full bg-green-600 mb-1 mx-1`}></div>{item.status}</> : null}
              </Typography>
            </div>
          </Box>

          <FormControl sx={{ width: '100%' }} size="small">
            <Typography variant="body2" >
              Link type
            </Typography>
            <Select
              onChange={(e) => setLinkType(e.target.value)}
              value={linkType}
              sx={{ fontSize: 14 }}
            >
              <MenuItem sx={{ fontSize: 14 }} value="Child">Child</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value="Parent">Parent</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value="Duplicate">Duplicate</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: '100%', marginY: 3 }} size="small">
            <Typography variant="body2" >
              Work items to link
            </Typography>
            <Select
              defaultValue={''}
              onChange={(e) => setValueToLink(e.target.value)}
            >
              <MenuItem value={''} hidden></MenuItem>
              {items && items.length > 0 ? items.map((item) =>
                <MenuItem key={item.taskId} value={item.taskId}>
                  <span className='flex items-center'>
                    <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" />
                    {item.type + ": " + item.name}
                  </span>
                </MenuItem>
              ) : null}
            </Select>
          </FormControl>
          <div className={`flex ${linkType === 'Parent' ? 'items-start' : 'items-end'}`}>
            {linkType === 'Parent' ? <img src="https://cdn.vsassets.io/v/M210_20221019.3/_content/Work/ltv-tree-rev.png" alt="link" />
              :  
              <img src="https://cdn.vsassets.io/v/M210_20221019.3/_content/Work/ltv-tree-fwd.png" alt="link" />
            }
            {valueToLink ? <Box sx={{ margin: 1 }} >
            <div className='flex items-center '>
              <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" />
              <Typography variant="body2" className='text-sm cursor-pointer underline'>
                {showLinkTo.name}
              </Typography>
            </div>
            <div className='ml-6 '>
              <Typography variant="caption" className='flex items-center' >
                Updated {dayjs(showLinkTo.updateDate).locale('th').format('DD/MM/BBBB')},
                {showLinkTo.status === "New" ? <><div className={`w-3 h-3 rounded-full bg-slate-400 mb-1 mx-1`}></div>{showLinkTo.status}</> : null}
                {showLinkTo.status === "Active" ? <><div className={`w-3 h-3 rounded-full bg-blue-600 mb-1 mx-1`}></div>{showLinkTo.status}</> : null}
                {showLinkTo.status === "Resolved" ? <><div className={`w-3 h-3 rounded-full bg-blue-600 mb-1 mx-1`}></div>{showLinkTo.status}</> : null}
                {showLinkTo.status === "Closed" ? <><div className={`w-3 h-3 rounded-full bg-green-600 mb-1 mx-1`}></div>{showLinkTo.status}</> : null}
              </Typography>
            </div>
          </Box> : null}
          </div>
          <Box sx={{ marginY: 3 }}>
            <Typography variant="body2" >
              Comment
            </Typography>
            <TextField
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: grey[200], color: "black", textTransform: 'none' }} onClick={() => handleSubmit(item.taskId)}>
            Ok
          </Button>
          <Button sx={{ backgroundColor: grey[200], color: "black", textTransform: 'none' }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogExiting