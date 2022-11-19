import React, { useState } from 'react'
import AvatarName from '../../layouts/AvatarName';
import TextareaAutosize from 'react-textarea-autosize';
import { selectName } from '../../../store/slices/authSlice';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../../../Const';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function EditDiscussion({ discus, setEdit, setDiscus, setLoading }) {
  const iconName = useSelector(selectName);
  const [discussion, setDiscussion] = useState(discus.comment);
  const updateDiscussion = (id) => {
    if (discussion !== discus.comment) {
      let data = {
        discusId: id,
        comment: discussion
      }
      axios.patch(BASE_URL + 'tasks/updateDiscusById', data)
        .then((res) => {
          if (res.status === 200) {
            axios.post(BASE_URL + 'tasks/getDiscus', { taskId: discus.taskId })
              .then((response) => {
                setDiscus(response.data);
                setLoading(false);
              })
          }
        })
      setEdit(false)
    }
  }

  return (
    <Box className='w-full'>
      <Box className='flex'>
        <Box className="mt-2 mr-1">
          <AvatarName name={iconName} />
        </Box>
        <TextareaAutosize minRows={4} defaultValue={discus.comment}
          onChange={e => setDiscussion(e.target.value)}
          placeholder={"Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person."}
          autoFocus className="area-textbox"
        />
      </Box>
      <Box className='flex justify-end mt-1'>
        <Button size="small" variant='contained' color="error"
          sx={{ marginX: 1 }} onClick={() => setEdit(false)}>
          Cancle
        </Button>
        <Button size="small" variant='contained' color="success"
          onClick={() => updateDiscussion(discus.discusId)}>
          Update
        </Button>
      </Box>
    </Box>
  )
}

export default EditDiscussion