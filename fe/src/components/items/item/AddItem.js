import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Textarea from '@mui/material/TextareaAutosize';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../../store/slices/itemSlice'

function AddItem() {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState(false);

  const addItemEnterSubmit = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      let value = {name: e.target.value, customerId: `${localStorage.getItem("id")}`};
      dispatch(addTask(value));
      setNewItem(false);
    }
  }

  const addOnBlur = (e) => {
    if (e.target.value) {
      let value = {name: e.target.value, customerId: `${localStorage.getItem("id")}`};
      dispatch(addTask(value));
    }
    setNewItem(false);
  }

  return (
    <Box >
      <Box className='flex justify-between'>
        <Box className='flex gap-x-2 bg-white w-fit h-fit pr-2 cursor-pointer' onClick={() => setNewItem(true)}>
          <img src="https://www.svgrepo.com/show/209357/plus-add.svg" alt="" className={`w-5 h-5`} />
          <Typography variant='body2' className='flex items-center'>New item</Typography>
        </Box>
        <img src='https://www.svgrepo.com/show/343280/search.svg'
          className="w-5 rotate-90  hover:bg-white" alt=''/>
      </Box>
      {newItem &&
        <Box onBlur={addOnBlur} className=' border-l-4 border-blue-400 min-h-10'>
          <Box className=' my-3 bg-white border-y border-r border-gray-300 h-full'>
            <Box className='pt-1 p-1.5 h-auto' >
              <Textarea 
                data-testid="inputNewItem" 
                type="text" autoFocus minRows={2}
                onKeyPress={addItemEnterSubmit}
                className='newitem-textbox px-1 focus:shadow-outline' />
            </Box>
          </Box>
        </Box>
      }
    </Box>
  )
}

export default AddItem