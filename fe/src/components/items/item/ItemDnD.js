import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTIVE, BASE_URL, CLOSED, NEW, REMOVED, RESOLVED } from '../../../Const';
import { openModal, selectItemStories, update } from '../../../store/slices/itemSlice';
import Modal from '../detail/Modal';

function ItemDnD({ col, item, index, openN, openC, name }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const items = useSelector(selectItemStories);
  const [temp, setTemp] = useState(JSON.parse(JSON.stringify(items)));
  const [assign, setAssign] = useState(item.assign);
  const id = localStorage.getItem('id');
  const [listUser, setListUser] = useState();

  useEffect(() => {
    axios.get(BASE_URL + 'users/customerall').then(response => {
        setListUser(response.data);
    });// eslint-disable-next-line
  }, [])

  useEffect(() => {
    // axios.patch(BASE_URL + "tasks/update", { taskId: item.taskId, status: name, customerId: id })
    setTemp(JSON.parse(JSON.stringify(items)))
  }, [item]) //eslint-disable-line

  const editStatus = (e, itemSelect) => {
    if (e.target.value !== name) {
      let newList = temp[name].items.filter(i => i.taskId !== itemSelect.taskId);
      if (e.target.value === "Removed") {
        temp[name].items = [];
        temp[name].items.push(...newList);
        setTemp(temp);
        axios.delete(BASE_URL + "tasks/remove", { data: { taskId: itemSelect.taskId } })
        dispatch(update(temp));
      }
      else {
        temp[name].items = [];
        temp[name].items.push(...newList);
        temp[e.target.value].items.push(itemSelect);
        setTemp(temp);
        axios.patch(BASE_URL + "tasks/update", { taskId: itemSelect.taskId, status: e.target.value, customerId: id })
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
      <div className='border-l-4 hover:border-t-1 border-blue-400 min-h-16 h-full'>
        <div className=' my-3 bg-white border-y border-r border-gray-300 h-full'>
          <div className='px-3'>
            <div className="flex flex-wrap pt-3">
              <img className='w-4 h-4 mr-1 mb-1' src="https://www.svgrepo.com/show/193759/open-book-book.svg" alt="" />
              <span className='text-xs break-all cursor-pointer hover:underline' onClick={() => handleModal(item.taskId)}>
                <span className='font-bold text-xs mr-1'>{item.taskId}</span>{item.name}</span>
            </div>
            {assign && 
              <div className='flex items-center relative mt-2'>
                <img src='https://www.svgrepo.com/show/165196/user.svg' alt='' className={`z-0 absolute w-5 h-5`} />
                <select className='overflow-visible focus:z-10 focus:pl-1 w-full pl-6
                        hover:outline focus:outline outline-1 outline-cyan-500 py-0.5 text-black 
                        text-sm appearance-none' value={assign} onChange={(e) => editAssign(e.target.value,item)} >
                    <option value={null}>Unassisned</option>
                    {listUser ? listUser.map((user, index) => 
                      <option key={index} value={user.customerId}> {user.firstName +" "+user.lastName} </option>
                    ) : null}
                </select>
              </div>
            }
            <div className='flex items-center py-3'>
              <span className='text-xs opacity-60 mr-20'> State </span>
              <div className='w-full flex items-center relative h-full'>
                <div className={`z-0 absolute left-2 font-bold w-2 h-2 rounded-full ${name === "New" ? " bg-slate-400" : "bg-green-600"}`}></div>
                <select onChange={(e) => editStatus(e, item)} className='overflow-visible focus:pl-1 hover:border focus:border w-full  focus:outline-none appearance-none focus:z-10 bg-white text-xs pl-6 ' defaultValue={name}>
                  <option value={NEW}>{NEW}          </option>
                  <option value={ACTIVE}>{ACTIVE}    </option>
                  <option value={RESOLVED}>{RESOLVED}</option>
                  <option value={CLOSED}>{CLOSED}    </option>
                  <option value={REMOVED}>{REMOVED}  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <Modal open={open} setOpen={setOpen} />}

    </>
  } else if ((name !== "New" && name !== "Closed")) {
    return <>
      <div className='border-l-4 hover:border-t-1 border-blue-400 min-h-16 '>
        <div className=' my-3 bg-white border-y border-r border-gray-300 h-full'>
          <div className='px-3'>
            <div className="flex flex-wrap pt-3">
              <img className='w-4 h-4 mr-1 mb-1' src="https://www.svgrepo.com/show/193759/open-book-book.svg" alt="" />
                <span className='text-xs break-all cursor-pointer hover:underline' onClick={() => handleModal(item.taskId)}>
                <span className='font-bold text-xs mr-1'>{item.taskId}</span>{item.name}
                </span>
            </div>
            {assign && 
              <div className='flex items-center relative mt-2'>
                <img src='https://www.svgrepo.com/show/165196/user.svg' alt='' className={`z-0 absolute w-5 h-5`} />
                <select className='overflow-visible focus:z-10 focus:pl-1 w-full pl-6
                        hover:outline focus:outline outline-1 outline-cyan-500 py-0.5 text-black 
                        text-sm appearance-none' value={assign} onChange={(e) => editAssign(e.target.value,item)} >
                    <option value={null}>Unassisned</option>
                    {listUser ? listUser.map((user, index) => 
                      <option key={index} value={user.customerId}> {user.firstName +" "+user.lastName} </option>
                    ) : null}
                </select>
              </div>
            }
            <div className='flex items-center py-3'>
              <span className='text-xs opacity-60 mr-20'> State </span>
              <div className='w-full flex items-center relative'>
                <div className={`z-0 absolute left-2 font-bold w-2 h-2 rounded-full bg-blue-600`}></div>
                <select style={{
                  borderRadius: "0px !important",
                }} onChange={(e) => editStatus(e, item)} className='overflow-hidden focus:z-10 bg-white only:rounded-none text-xs pl-6 focus:pl-1 hover:border focus:border w-full appearance-none focus:outline-none' defaultValue={name}>
                   <option value={NEW}>{NEW}         </option>
                  <option value={ACTIVE}>{ACTIVE}    </option>
                  <option value={RESOLVED}>{RESOLVED}</option>
                  <option value={CLOSED}>{CLOSED}    </option>
                  <option value={REMOVED}>{REMOVED}  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <Modal open={open} setOpen={setOpen} item={item} index={index} col={col} />}

    </>
  }
}

export default ItemDnD