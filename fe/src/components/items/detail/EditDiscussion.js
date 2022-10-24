import React, { useState } from 'react'
import AvatarName from '../../layouts/AvatarName';
import TextareaAutosize from 'react-textarea-autosize';
import { selectName } from '../../../store/slices/authSlice';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL } from '../../../Const';

function EditDiscussion({ discus, setEdit , setDiscus,setLoading }) {
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
    <div className='w-full'>
      <div className='flex'>
        <div className="mt-2 mr-1">
          <AvatarName name={iconName} />
        </div>
        <TextareaAutosize minRows={4} onChange={e => setDiscussion(e.target.value)} defaultValue={discus.comment}
          placeholder={"Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person."}
          autoFocus className="text-sm border w-full mt-2 p-1 focus:outline-none focus:border-blue-500 resize-none overflow-hidden "
        />
      </div>
      <div className='flex justify-end mt-1'>
        <button className=' bg-gray-200 hover:bg-gray-400 py-2 px-6 text-sm rounded-xl mr-2' onClick={() => setEdit(false)}>
          Cancle
        </button>
        <button className=' bg-gray-200 hover:bg-gray-400 py-1 px-4 text-sm rounded-xl' onClick={() => updateDiscussion(discus.discusId)}>
          Update
        </button>
      </div>
    </div>
  )
}

export default EditDiscussion