import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ACTIVE, BASE_URL, CLOSED, NEW, REMOVED, RESOLVED } from '../../../Const';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearRelation } from '../../../store/slices/relationSlice';

function HeaderDetail({ item, setOpen, setStatus, assign, setAssign, submit , name, setName}) {
    const [listUser, setListUser] = useState();
    const dispatch = useDispatch();
    let location = useLocation();

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
            <div className="border-l-8 p-2 border-blue-500 text-black">
                <div className="flex items-center justify-between">
                    <span className="cursor-pointer text-sm hover:underline flex uppercase"><img src="https://www.svgrepo.com/show/53135/book.svg" className="w-4 h-4 mr-2" alt="" /> {item.type}</span>
                    {location.pathname === '/' ? <img className="w-3 h-3 cursor-pointer" src="https://www.svgrepo.com/show/151290/close.svg" alt="" onClick={handleClose} /> : null}
                </div>
                <div className="flex items-center justify-between w-1/2">
                    <span className='mr-1 font-bold'>{1}</span>
                    <input className="my-2 w-full ml-1 box-border hover:outline focus:outline outline-1 outline-cyan-500 p-1 text-black text-sm" onChange={(e) => setName(e.target.value)} defaultValue={name} />
                </div>
                <div className="flex items-center justify-between">
                    <div className='flex items-center relative mt-2 w-1/4'>
                        <img src='https://www.svgrepo.com/show/165196/user.svg' alt='' className={`z-0 absolute w-5 h-5`} />
                        <select className='overflow-visible focus:z-10 focus:pl-1 w-full pl-6
                        hover:outline focus:outline outline-1 outline-cyan-500 py-0.5 text-black 
                        text-sm appearance-none' value={assign ? assign : ''} onChange={(e) => setAssign(e.target.value)} >
                            <option value=''>Unassisned</option>
                            {listUser ? listUser.map((user, index) =>
                                <option key={index} value={user.customerId}> {user.firstName + " " + user.lastName} </option>
                            ) : null}
                        </select>
                    </div>
                    <div className='flex items-center mr-5 text-sm' >
                        <div className='flex items-center bg-blue-500 px-3 py-1 text-white text-sm cursor-pointer' onClick={submit}>
                            <img src="https://www.svgrepo.com/show/262898/diskette-save.svg" className='w-4 h-4 mr-2' alt="" />
                            Save & Close
                        </div>
                        <div className='flex items-center bg-gray-200 px-3 py-1 text-sm cursor-pointer ml-1 border-r-2 border-gray-500'>
                            Follow
                        </div>
                        <div className='flex items-center bg-gray-200 py-1.5 text-sm cursor-pointer px-1'>
                            <img src="https://www.svgrepo.com/show/417962/setting.svg" className='w-4 h-4' alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 h-24 py-4" >
                <div className="flex  item-center px-4 pb-3">
                    <div className='flex items-center justify-between mr-3'>
                        <span className='text-xs mr-10'> State </span>
                        <div className='flex items-center relative box-border w-56 ml-0.5'>
                            {item.status === NEW ? <div className={`w-3 h-3 rounded-full bg-slate-400`}></div> : ''}
                            {item.status === ACTIVE ? <div className={`w-3 h-3 rounded-full bg-blue-600`}></div> : ''}
                            {item.status === RESOLVED ? <div className={`w-3 h-3 rounded-full bg-blue-600`}></div> : ''}
                            {item.status === CLOSED ? <div className={`w-3 h-3 rounded-full bg-green-600`}></div> : ''}
                            {item.status === REMOVED ? <div className={`w-3 h-3 rounded-full bg-slate-400`}></div> : ''}
                            <select onChange={(e) => setStatus(e.target.value)}
                                className='bg-gray-100 ml-1 box-border hover:outline focus:outline outline-1 outline-cyan-500 px-1 text-black w-full text-sm appearance-none'
                                defaultValue={item.status}>
                                <option value={null} hidden></option>
                                <option value={NEW}>      {NEW}      </option>
                                <option value={ACTIVE}>   {ACTIVE}   </option>
                                <option value={RESOLVED}> {RESOLVED} </option>
                                <option value={CLOSED}>   {CLOSED}   </option>
                                <option value={REMOVED}>  {REMOVED}  </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <span className='text-xs w-20'><u>A</u>rea</span>
                        <select className='bg-gray-100 box-border hover:outline focus:outline outline-1 outline-cyan-500  text-black w-80 text-sm appearance-none' defaultValue="MiniProject">
                            <option value={null} hidden></option>
                            <option value="MiniProject">MiniProject</option>
                            <option value="MiniProject222">MiniProject222</option>
                        </select>
                    </div>
                </div>
                <div className="flex item-center  px-4">
                    <div className='flex items-center justify-between mr-3'>
                        <span className='text-xs pt-1 mr-7'> Reason </span>
                        <div className='flex items-center relative box-border w-56 mr-0.5'>
                            {item.status === NEW && <img src="https://www.svgrepo.com/show/14475/lock.svg" className="w-3.5" alt="" />}
                            {item.status === NEW && <span className="text-sm pt-1 pl-2">New</span>}
                            {item.status === ACTIVE && <span className="text-sm pt-1 pl-2 truncate">Implementation started</span>}
                            {item.status === RESOLVED && <span className="text-sm pt-1 pl-2 truncate">Code complete and unit tests pass</span>}
                            {item.status === CLOSED && <span className="text-sm pt-1 pl-2 truncate">Acceptance tests pass</span>}
                            {item.status === REMOVED && <span className="text-sm pt-1 pl-2 truncate">Removed from the backlog</span>}
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <span className='text-xs w-20'>Ite<u>r</u>ation</span>
                        <select className='bg-gray-100 box-border hover:outline focus:outline outline-1 outline-cyan-500 text-black w-80 text-sm appearance-none' defaultValue="Iteration1">
                            <option value='' hidden></option>
                            <option value="Iteration1">      Miniproject\Iteration 1      </option>
                            <option value="MiniProject">      MiniProject      </option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderDetail