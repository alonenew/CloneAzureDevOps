import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ACTIVE, BASE_URL, CLOSED, NEW, REMOVED, RESOLVED } from '../../../Const';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearRelation } from '../../../store/slices/relationSlice';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HeaderDetail({ item, setOpen, setStatus, assign, setAssign, submit , name, setName}) {
    const [listUser, setListUser] = useState();

    const dispatch = useDispatch();
    let location = useLocation();
    console.log(".................................");
    console.log(item);
    useEffect(() => {
        axios.get(BASE_URL + 'users/customerall').then(response => {
            setListUser(response.data);
        });
    }, [])

    const handleClose = () => {
        dispatch(clearRelation());
        setOpen(false)
    }

    return (
        <>
            <Box className="border-l-8 p-2 border-blue-500 text-black">
                <Box className="flex items-center justify-between">
                    <Typography variant='caption' className="cursor-pointer text-sm hover:underline flex uppercase">
                        <img src="https://www.svgrepo.com/show/53135/book.svg" 
                        className="w-4 h-4 mr-2" alt="" /> {item.type}
                    </Typography>
                    {location.pathname === '/' 
                    ? <img className="icon-onclick" src="https://www.svgrepo.com/show/151290/close.svg" alt="" onClick={handleClose} /> 
                    : null}
                </Box>
                <Box className="flex items-center justify-between w-1/2">
                    <Typography variant='body2' className='mr-1 font-bold'>{item.taskId}</Typography>
                    <input className="my-2 w-full ml-1 box-border hover:outline focus:outline outline-1 outline-cyan-500 p-1 text-black text-sm" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                </Box>
                <Box className="flex items-center justify-between">
                    <Box className='flex items-center relative mt-2 w-1/4'>
                        <img src='https://www.svgrepo.com/show/165196/user.svg' alt='' className={`z-0 absolute w-5 h-5`} />
                        <select className='overflow-visible focus:z-10 focus:pl-1 w-full pl-6
                        hover:outline focus:outline outline-1 outline-cyan-500 py-0.5 text-black 
                        text-sm appearance-none' 
                        data-testid="select-test"
                        value={assign ? assign : ''} 
                        onChange={(e) => setAssign(e.target.value)} 
                        >
                            <option value=''>Unassisned</option>
                            {listUser ? listUser.map((user, index) =>
                                <option key={index} value={user.customerId}> {user.firstName + " " + user.lastName} </option>
                            ) : null}
                        </select>
                    </Box>
                    <Box className='flex items-center mr-5 text-sm' >
                        <Box className='btn-detail text-white bg-blue-500' onClick={submit}>
                            <img src="https://www.svgrepo.com/show/262898/diskette-save.svg" className='w-4 h-4 mr-2' alt="" />
                            Save & Close
                        </Box>
                        <Box className='btn-detail bg-gray-200 ml-1 border-r-2 border-gray-500'>
                            Follow
                        </Box>
                        <Box className='flex items-center bg-gray-200 py-1.5 text-sm cursor-pointer px-1'>
                            <img src="https://www.svgrepo.com/show/417962/setting.svg" className='w-4 h-4' alt="" />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="bg-gray-100 h-24 py-4" >
                <Box className="flex  item-center px-4 pb-3">
                    <Box className='flex items-center justify-between mr-2'>
                        <Typography variant='caption' pr={4}> State </Typography>
                        <Box className='flex items-center relative box-border w-56 ml-1'>
                            {item.status === NEW ? <Box className={`circle-status bg-slate-400`}></Box> : ''}
                            {item.status === ACTIVE ? <Box className={`circle-status bg-blue-600`}></Box> : ''}
                            {item.status === RESOLVED ? <Box className={`circle-status bg-blue-600`}></Box> : ''}
                            {item.status === CLOSED ? <Box className={`circle-status bg-green-600`}></Box> : ''}
                            {item.status === REMOVED ? <Box className={`circle-status bg-slate-400`}></Box> : ''}
                            <select onChange={(e) => setStatus(e.target.value)}
                                className='select-status ml-1 px-1 w-full'
                                defaultValue={item.status}
                                size='small' data-testid="select">
                                <option value={null} hidden></option>
                                <option value={NEW}>      {NEW}      </option>
                                <option value={ACTIVE}>   {ACTIVE}   </option>
                                <option value={RESOLVED}> {RESOLVED} </option>
                                <option value={CLOSED}>   {CLOSED}   </option>
                                <option value={REMOVED}>  {REMOVED}  </option>
                            </select>
                        </Box>
                    </Box>
                    <Box className="flex items-center w-full">
                        <Typography variant='caption' className='w-20'><u>A</u>rea</Typography>
                        <select className='select-status' defaultValue="MiniProject">
                            <option value={null} hidden></option>
                            <option value="MiniProject">MiniProject</option>
                            <option value="MiniProject222">MiniProject222</option>
                        </select>
                    </Box>
                </Box>
                <Box className="flex item-center px-4">
                    <Box className='flex items-center justify-between mr-3'>
                        <Typography variant='caption' pr={2}> Reason </Typography>
                        <Box className='flex items-center relative box-border w-56 mr-0.5'>
                            {item.status === NEW && <img src="https://www.svgrepo.com/show/14475/lock.svg" className="w-3.5" alt="" />}
                            {item.status === NEW && <span className="text-sm pt-1 pl-2">New</span>}
                            {item.status === ACTIVE && <span className="text-status">Implementation started</span>}
                            {item.status === RESOLVED && <span className="text-status">Code complete and unit tests pass</span>}
                            {item.status === CLOSED && <span className="text-status">Acceptance tests pass</span>}
                            {item.status === REMOVED && <span className="text-status">Removed from the backlog</span>}
                        </Box>
                    </Box>
                    <Box className="flex items-center w-full">
                        <Typography variant='caption' className='w-20'>Ite<u>r</u>ation</Typography>
                        <select className='select-status w-80' defaultValue="Iteration1">
                            <option value='' hidden></option>
                            <option value="Iteration1">      Miniproject\Iteration 1      </option>
                            <option value="MiniProject">      MiniProject      </option>
                        </select>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default HeaderDetail