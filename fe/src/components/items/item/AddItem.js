import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../../../Const';
import { add } from '../../../store/slices/itemSlice'

function AddItem() {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState(false);

  const addItemEnterSubmit = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      let value = {name: e.target.value, customerId: `${localStorage.getItem("id")}`};
      axios.post(BASE_URL+'tasks/addtask', value).then(response => {
        dispatch(add({name: response.data.data.name, taskId: response.data.data.taskId}));
      });
      setNewItem(false);
    }
  }

  const addOnBlur = (e) => {
    if (e.target.value) {
      let value = {name: e.target.value, customerId: `${localStorage.getItem("id")}`};
      axios.post(BASE_URL+'tasks/addtask', value).then(response => {
        dispatch(add({name: response.data.data.name, taskId: response.data.data.taskId}));
      });
    }
    setNewItem(false);
  }

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex gap-x-2 imt bg-white w-fit pr-2 cursor-pointer' onClick={() => setNewItem(true)}>
          <img src="https://www.svgrepo.com/show/209357/plus-add.svg" alt="" className={`w-6 h-6`} />
          <span className='flex items-center'>New item</span>
        </div>
        <img src='https://www.svgrepo.com/show/343280/search.svg'
          className="w-5 rotate-90  hover:bg-white" alt=''/>
      </div>
      {newItem &&
        <div onBlur={addOnBlur} className=' border-l-4 border-blue-400 min-h-10'>
          <div className=' my-3 bg-white border-y border-r border-gray-300 h-full'>
            <div className='pt-1 p-1.5 h-11'>
              <textarea type="text"
                autoFocus
                onKeyPress={addItemEnterSubmit}
                className=' px-1 resize-none text-xs border overflow-hidden w-full focus:outline-none focus:shadow-outline h-full ' />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default AddItem