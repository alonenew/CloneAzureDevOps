import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { selectRelation } from '../../../store/slices/relationSlice';
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../store/slices/itemSlice';

function BoxRelate({ showLinkTo, name }) {
    const dispatch = useDispatch();
    const handleModal = (id) => {
        dispatch(openModal(id));
    }
    return <Box sx={{ margin: 1 }}>
        <Typography variant="caption">
            {name}
        </Typography>
        {showLinkTo.map((item) => {
            return <Box key={item.taskId}>
                <Box className='flex items-center '>
                    <img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" />
                    <Typography variant="body2" className='text-sm cursor-pointer underline' onClick={() => handleModal(item.taskId)}>
                        {item.taskId + " " + item.name}
                    </Typography>
                </Box>
                <Box className='ml-6 '>
                    <Typography variant="caption" className='flex items-center' >
                        Updated {dayjs(item.updateDate).locale('th').format('DD/MM/BBBB')},
                        {item.status === "New" ? <><Box className={`circle-status bg-slate-400 mb-1 mx-1`}></Box>{item.status}</> : null}
                        {item.status === "Active" ? <><Box className={`circle-status bg-blue-600 mb-1 mx-1`}></Box>{item.status}</> : null}
                        {item.status === "Resolved" ? <><Box className={`circle-status bg-blue-600 mb-1 mx-1`}></Box>{item.status}</> : null}
                        {item.status === "Closed" ? <><Box className={`circle-status bg-green-600 mb-1 mx-1`}></Box>{item.status}</> : null}
                    </Typography>
                </Box>
            </Box>
        })}
    </Box>
}

function ItemRelate({ items }) {
    const relate = useSelector(selectRelation);
    let parent = [], child = [], duplicate = [];
    if (items && relate.Parent.valueToLink) {
        parent.push(items.find(item => {
            return item.taskId === relate.Parent.valueToLink.taskLink
        }))
    }
    if (items && relate.Child.valueToLink.length > 0) {
        for (let index = 0; index < relate.Child.valueToLink.length; index++) {
            child.push(items.find(item => {
                return item.taskId === relate.Child.valueToLink[index].taskLink
            }))
        }
    }
    if (items && relate.Duplicate.valueToLink.length > 0) {
        for (let index = 0; index < relate.Duplicate.valueToLink.length; index++) {
            duplicate.push(items.find(item => {
                return item.taskId === relate.Duplicate.valueToLink[index].taskLink
            }))
        }
    }
    return (
        <>
            {parent.length > 0 ?
                <BoxRelate showLinkTo={parent} name={relate.Parent.linkType} />
                : null
            }
            {child.length > 0 ?
                <BoxRelate showLinkTo={child} name={relate.Child.linkType} />
                : null
            }
            {duplicate.length > 0 ?
                <BoxRelate showLinkTo={duplicate} name={relate.Duplicate.linkType} />
                : null
            }
        </>
    )
}

export default ItemRelate