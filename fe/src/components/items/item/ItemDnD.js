import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIVE, BASE_URL, CLOSED, NEW, REMOVED, RESOLVED } from '../../../Const';
import { openModal, remove, selectItemStories, update, updateTask } from '../../../store/slices/itemSlice';
import Modal from '../detail/Modal';

function ItemDnD({ col, item, index, openN, openC, name }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const items = useSelector(selectItemStories);
  const [temp, setTemp] = useState(JSON.parse(JSON.stringify(items)));
  const [assign, setAssign] = useState(item.assign);
  const id = localStorage.getItem('id');
  const [listUser, setListUser] = useState();

  console.log("------------------------------------------");
  console.log(col);
  console.log(item);
  console.log(index);
  console.log(openN);
  console.log(openC);
  console.log(name);
  useEffect(() => {
    axios.get(BASE_URL + 'users/customerall').then(response => {
        setListUser(response.data);
    });// eslint-disable-next-line
  }, [])

  useEffect(() => {
    let data = { 
      taskId: item.taskId, 
      status: name, 
      customerId: id 
    };
    dispatch(updateTask(data))
    setTemp(JSON.parse(JSON.stringify(items)))
  }, [item]) //eslint-disable-line

  const editStatus = (e, itemSelect) => {
    if (e.target.value !== name) {
      let newList = temp[name].items.filter(i => i.taskId !== itemSelect.taskId);
      if (e.target.value === "Removed") {
        temp[name].items = [];
        temp[name].items.push(...newList);
        setTemp(temp);
        let data = { data: { taskId: itemSelect.taskId } }
        dispatch(remove(data));
        dispatch(update(temp));
      }
      else {
        temp[name].items = [];
        temp[name].items.push(...newList);
        temp[e.target.value].items.push(itemSelect);
        setTemp(temp);
        let data = { 
          taskId: itemSelect.taskId, 
          status: e.target.value, 
          customerId: id
        };
        dispatch(updateTask(data));
        dispatch(update(temp));
      }
    }
  }

  const editAssign = (value, item) => {
    if (value !== assign) {
      let data = {
        taskId: item.taskId,
        assign: value, 
        customerId: id
      }
      axios.patch(BASE_URL + "tasks/updateAssign", data)
      setAssign(value);
    }
  }

  const handleModal = (id) => {
    setOpen(true);
    dispatch(openModal(id));
  }

  if ((openN && (name === "New")) || (openC && (name === "Closed"))) {
    return <>
      <Box className='border-l-4 hover:border-t-1 border-blue-400 min-h-16 h-full'>
        <Box className=' my-3 bg-white border-y border-r border-gray-300 h-full'>
          <Box className='px-3'>
            <Box className="flex flex-wrap pt-3">
              <img className='w-4 h-4 mr-1 mb-1' src="https://www.svgrepo.com/show/193759/open-book-book.svg" alt="" />
              <Typography variant='caption' className=' break-all cursor-pointer hover:underline' 
              onClick={() => handleModal(item.taskId)}>
                <Typography variant='caption' mr={0.5} fontWeight={'bold'}>{item.taskId}</Typography>{item.name}</Typography>
            </Box>
            {assign && 
              <Box className='flex items-center relative mt-2'>
                <img src='https://www.svgrepo.com/show/165196/user.svg' alt='' className={`z-0 absolute w-5 h-5`} />
                <select className='overflow-visible focus:z-10 focus:pl-1 w-full pl-6
                        hover:outline focus:outline outline-1 outline-cyan-500 py-0.5 text-black 
                        text-sm appearance-none'
                         value={assign} onChange={(e) => editAssign(e.target.value,item)} >
                    <option value={null}>Unassisned</option>
                    {listUser ? listUser.map((user, index) => 
                      <option key={index} value={user.customerId}> {user.firstName +" "+user.lastName} </option>
                    ) : null}
                </select>
              </Box>
            }
            <Box className='flex items-center py-3'>
              <Typography variant='caption' mr={10} className='opacity-60'> State </Typography>
              <Box className='w-full flex items-center relative h-full'>
                <Box className={`box-status-home ${name === "New" ? " bg-slate-400" : "bg-green-600"}`}></Box>
                <select onChange={(e) => editStatus(e, item)} 
                data-testid="select-test"
                className='select-status-home' defaultValue={name}>
                  <option value={NEW}>{NEW}          </option>
                  <option value={ACTIVE}>{ACTIVE}    </option>
                  <option value={RESOLVED}>{RESOLVED}</option>
                  <option value={CLOSED}>{CLOSED}    </option>
                  <option value={REMOVED}>{REMOVED}  </option>
                </select>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {open && <Modal 
      open={open} 
      setOpen={setOpen} 
      />}

    </>
  } else if ((name !== "New" && name !== "Closed")) {
    return <>
      <Box className='border-l-4 hover:border-t-1 border-blue-400 min-h-16 '>
        <Box className=' my-3 bg-white border-y border-r border-gray-300 h-full'>
          <Box className='px-3'>
            <Box className="flex flex-wrap pt-3 ">
              <img className='w-4 h-4 mr-1 mb-1' src="https://www.svgrepo.com/show/193759/open-book-book.svg" alt="" />
                <Typography variant='caption' className='break-all cursor-pointer hover:underline' onClick={() => handleModal(item.taskId)}>
                  <Typography variant='caption' mr={0.5} fontWeight={'bold'}>{item.taskId}</Typography>{item.name}
                </Typography>
            </Box>
            {assign && 
              <Box className='flex items-center relative mt-2'>
                <img src='https://www.svgrepo.com/show/165196/user.svg' alt='' className={`z-0 absolute w-5 h-5`} />
                <select className='overflow-visible focus:z-10 focus:pl-1 w-full pl-6
                        hover:outline focus:outline outline-1 outline-cyan-500 py-0.5 text-black 
                        text-sm appearance-none' 
                        
                        value={assign} onChange={(e) => editAssign(e.target.value,item)} >
                    <option value={null}>Unassisned</option>
                    {listUser ? listUser.map((user, index) => 
                      <option key={index} value={user.customerId}> {user.firstName +" "+user.lastName} </option>
                    ) : null}
                </select>
              </Box>
            }
            <Box className='flex items-center py-3'>
              <Typography variant='caption' mr={10}  className='opacity-60'> State </Typography>
              <Box className='w-full flex items-center relative'>
                <Box className={`box-status-home bg-blue-600`}></Box>
                <select style={{
                  borderRadius: "0px !important",
                }} onChange={(e) => editStatus(e, item)} 
                data-testid="select-test"
                className='select-status-home' defaultValue={name}>
                  <option value={NEW}>{NEW}          </option>
                  <option value={ACTIVE}>{ACTIVE}    </option>
                  <option value={RESOLVED}>{RESOLVED}</option>
                  <option value={CLOSED}>{CLOSED}    </option>
                  <option value={REMOVED}>{REMOVED}  </option>
                </select>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {open && <Modal open={open} setOpen={setOpen} item={item} index={index} col={col} />}

    </>
  }
}

export default ItemDnD