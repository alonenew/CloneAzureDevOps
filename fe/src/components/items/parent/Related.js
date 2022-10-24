import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogExiting from './DialogExiting';
import DialogNewItem from './DialogNewItem';
import buddhistEra from 'dayjs/plugin/buddhistEra'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import axios from 'axios';
import { BASE_URL } from '../../../Const';
import ItemRelate from './ItemRelate';
import { addRelataion, clearRelation } from '../../../store/slices/relationSlice';
import { useDispatch } from 'react-redux';

function Related({ item }) {
    dayjs.extend(buddhistEra)
    const dispatch = useDispatch();
    const [items, setItems] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openRelated, setOpenRelated] = useState(true);
    const [openExisting, setOpenExisting] = useState(false);
    const [openNewItem, setOpenNewItem] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    

    useEffect(() => {
        axios.get(BASE_URL + 'tasks/gettask').then((res) => {
            setItems(res.data.filter(list => list.taskId !== item.taskId));
        });
        dispatch(clearRelation());
        item = item.relations.map((listRelation) => {
            dispatch(addRelataion({
                taskId: listRelation.taskId, linkType: listRelation.linkType, valueToLink: listRelation.taskLink
            }))
        setIsLoading(false);
        })

            
    }, [])

    const handleExisting = () => {
        setOpenExisting(true);
        setAnchorEl(null);
    }

    const handleNewItem = () => {
        setOpenNewItem(true);
        setAnchorEl(null);
    }
    return (
        <>
            <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 mt-2" onClick={() => setOpenRelated(!openRelated)}>
                <h4>Related Work</h4>
            </div>
            {openRelated ?
                <>
                    <Box>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            sx={{ fontSize: 14, textTransform: 'none' }}
                        >
                            <img src="https://www.svgrepo.com/show/4797/plus.svg" alt="" className='w-3 h-3 mr-1 pb-0.5' /> Add link
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem sx={{ fontSize: 14 }} onClick={handleExisting} >Existing item</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} onClick={handleNewItem}  >New item</MenuItem>
                        </Menu>
                    </Box>
                    <Box className="bg-gray-100 p-2">
                        <Typography variant="caption" gutterBottom>
                            Add an existing work item as a parent
                        </Typography>
                    </Box>

                    {!isLoading ? <ItemRelate items={items} /> : null}
                                
                    <DialogExiting item={item} items={items}  open={openExisting} setOpen={setOpenExisting} />
                    <DialogNewItem item={item} items={items} open={openNewItem} setOpen={setOpenNewItem} />
                </>
                : null
            }</>
    )
}

export default Related