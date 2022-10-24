import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { selectRelation } from '../../../store/slices/relationSlice';
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../store/slices/itemSlice';

function BoxRelate({showLinkTo, name}){
    const dispatch = useDispatch();
    const handleModal = (id) => {
        dispatch(openModal(id));
    }

    return <Box sx={{margin: 1}}>
        <Typography variant="caption">
            {name}
        </Typography>
        <div className='flex items-center '>
            <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" />
            <Typography variant="body2" className='text-sm cursor-pointer underline' onClick={() => handleModal(showLinkTo.taskId)}>
                {showLinkTo.taskId +" "+ showLinkTo.name}
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
    </Box>
}

function ItemRelate({items}) {
    const relate = useSelector(selectRelation);
    let child, parent, duplicate;
    if (items && relate.Child.valueToLink) {
        child = items.find(item => {
            return item.taskId === relate.Child.valueToLink
        })
    }
    if (items && relate.Parent.valueToLink) {
        parent = items.find(item => {
            return item.taskId === relate.Parent.valueToLink
        })
    }
    if (items && relate.Duplicate.valueToLink) {
        duplicate = items.find(item => {
            return item.taskId === relate.Duplicate.valueToLink
        })
    }

  return (
    <>
        {parent ?
            <BoxRelate showLinkTo={parent} name={relate.Parent.linkType}/>
            : null
        }
        {child ? 
            <BoxRelate showLinkTo={child} name={relate.Child.linkType}/>
            : null
        }
        {duplicate ? 
            <BoxRelate showLinkTo={duplicate} name={relate.Duplicate.linkType}/>
            : null
        }
    </>
  )
}

export default ItemRelate