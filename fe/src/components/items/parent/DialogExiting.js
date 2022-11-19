import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import buddhistEra from 'dayjs/plugin/buddhistEra'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { useDispatch, useSelector } from 'react-redux';
import { addRelataion, selectRelation } from '../../../store/slices/relationSlice';
import { ACTIVE, CLOSED, NEW, RESOLVED } from '../../../Const';

function DialogExiting({ item, items, open, setOpen }) {
  dayjs.extend(buddhistEra)
  const id = localStorage.getItem('id')
  const relate = useSelector(selectRelation);
  let parent;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [valueToLink, setValueToLink] = useState();
  const [linkType, setLinkType] = useState(2);
  const [comment, setComment] = useState(null);
  const [validation, setValidation] = useState(false);
  let showLinkTo;

  if (items && relate.Parent.valueToLink) {
    parent = items.find(item => {
      return item.taskId === relate.Parent.valueToLink.taskId
    })
    items = items.filter(item => item.taskId !== relate.Parent.valueToLink.taskLink)
  }
  if (items && relate.Child.valueToLink.length > 0) {
    for (let index = 0; index < relate.Child.valueToLink.length; index++) {
      items = items.filter(item => item.taskId !== relate.Child.valueToLink[index].taskLink)
    }
  }
  if (items && relate.Duplicate.valueToLink.length > 0) {
    for (let index = 0; index < relate.Duplicate.valueToLink.length; index++) {
      items = items.filter(item => item.taskId !== relate.Duplicate.valueToLink[index].taskLink)
    }
  }

  if (items && valueToLink) {
    showLinkTo = items.find(list => {
      return list.taskId === valueToLink
    })
  }

  const handleClose = () => {
    setOpen(false);
    setLinkType(2);
    setValueToLink();
  }

  useEffect(() => {
      setValidation(false);
      if (valueToLink && (linkType < 3)) {
          let list = items.find(list => {
            return list.taskId === valueToLink
          });
          for (let i = 0; i < list.relations.length; i++) {
            if ((list.relations[i].linkType < 3)) {
              setValidation(true);
              break;
            }
            else {
              setValidation(false);
            }
          }
      }
  }, [valueToLink]);
  
  const handleSubmit = (taskId) => {
    let data = {
      customerId: id,
      linkType,
      taskId,
      taskLink: showLinkTo.taskId,
      comment
    }
    dispatch(addRelataion({ taskId, linkType, valueToLink: data, addRelate: data }))
    setOpen(false);
    setLinkType(2);
    setValueToLink();
  }
  
  const Menus = [
    { title: "", value: "" , display: "none"},
    { title: "Parent", value: 1 , display: relate.Parent.valueToLink ? "none" : "block"},
    { title: "Child ", value: 2 , display: ""},
    { title: "Duplicate", value: 3 , display: ""},
  ];

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
            <Box className='flex items-center'>
              <img src="https://www.svgrepo.com/show/69769/pin.svg" className="w-5 h-5 mb-4" alt="" />
              <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mx-2" alt="" />
              <Typography variant="body2" className='text-sm cursor-pointer underline' onClick={() => navigate('/detail/id=' + item.taskId, { replace: true, state: { item } })}>
                {item.taskId + " " + item.name}
              </Typography>
            </Box>
            <Box className='ml-6 '>
              <Typography variant="caption" className='flex items-center' >
                Updated {dayjs(item.updateDate).locale('th').format('DD/MM/BBBB')},
                {item.status === NEW ? <><div className={`circle-status bg-slate-400 mb-1 mx-1`}></div>{item.status}</> : null}
                {item.status === ACTIVE ? <><div className={`circle-status bg-blue-600 mb-1 mx-1`}></div>{item.status}</> : null}
                {item.status === RESOLVED ? <><div className={`circle-status bg-blue-600 mb-1 mx-1`}></div>{item.status}</> : null}
                {item.status === CLOSED ? <><div className={`circle-status bg-green-600 mb-1 mx-1`}></div>{item.status}</> : null}
              </Typography>
            </Box>
          </Box>
          <FormControl sx={{ width: '100%' }} size="small">
            <Typography variant="body2" >
              Link type
            </Typography>
            <Select
              onChange={(e) => setLinkType(e.target.value)}
              id="linkType"
              value={linkType ? linkType : ''}
              sx={{ fontSize: 14 }}
            >
              {Menus.map((menu,index) => {
                return <MenuItem key={index} value={menu.value} sx={{display: menu.display}}>{menu.title}</MenuItem>
              })}

            </Select>
          </FormControl>
          <FormControl sx={{ width: '100%', marginY: 3 }} size="small">
            <Typography variant="body2" >
              Work items to link
            </Typography>
            <Select
              id='taskLink'
              value={valueToLink ? valueToLink : ''}
              onChange={(e) => setValueToLink(e.target.value)}
            >
              <MenuItem value='' sx={{display: 'none'}}></MenuItem>
              {items && items.length > 0 ? items.map((item) =>
                <MenuItem key={item.taskId} value={item.taskId}>
                  <Typography variant='body2' className='flex items-center'>
                    <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" />
                    {item.type + " " + item.taskId + ": " + item.name}
                  </Typography>
                </MenuItem>
              ) : null}
            </Select>
            {validation ? <Typography variant="body2" className='text-sm text-red-500'>
              Result in a circular relationship. To create this link, evaluate the existing links.
            </Typography> : ''}
          </FormControl>
          <Box className={`flex ${linkType === 1 ? 'items-start' : 'items-end'}`}>
            {linkType === 1 ? <img src="https://cdn.vsassets.io/v/M210_20221019.3/_content/Work/ltv-tree-rev.png" alt="link" />
              :
              <img src="https://cdn.vsassets.io/v/M210_20221019.3/_content/Work/ltv-tree-fwd.png" alt="link" />
            }
            {showLinkTo ? <Box sx={{ margin: 1 }} >
              <Box className='flex items-center '>
                <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" />
                <Typography variant="body2" className='text-sm cursor-pointer underline'>
                  {showLinkTo.name}
                </Typography>
              </Box>
              <Box className='ml-6 '>
                <Typography variant="caption" className='flex items-center' >
                  Updated {dayjs(showLinkTo.updateDate).locale('th').format('DD/MM/BBBB')},
                  {showLinkTo.status === NEW ? <><Box className={`circle-status bg-slate-400 mb-1 mx-1`}></Box>{showLinkTo.status}</> : null}
                  {showLinkTo.status === ACTIVE ? <><Box className={`circle-status bg-blue-600 mb-1 mx-1`}></Box>{showLinkTo.status}</> : null}
                  {showLinkTo.status === RESOLVED ? <><Box className={`circle-status bg-blue-600 mb-1 mx-1`}></Box>{showLinkTo.status}</> : null}
                  {showLinkTo.status === CLOSED ? <><Box className={`circle-status bg-green-600 mb-1 mx-1`}></Box>{showLinkTo.status}</> : null}
                </Typography>
              </Box>
            </Box> : null}
          </Box>
          <Box sx={{ marginY: 3 }}>
            <Typography variant="body2" >
              Comment
            </Typography>
            <TextField
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" 
            onClick={() => handleSubmit(item.taskId)} disabled={validation ? true : false}>
            Ok
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogExiting