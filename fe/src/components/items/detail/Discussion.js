import React, { useEffect, useState } from 'react'
import ConfirmDeleteDiscus from './ConfirmDeleteDiscus';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th'
import AvatarName from '../../layouts/AvatarName';
import TextareaAutosize from 'react-textarea-autosize';
import { selectName } from '../../../store/slices/authSlice';
import { useSelector } from 'react-redux'
import EditDiscussion from './EditDiscussion';
import axios from 'axios';
import { BASE_URL } from '../../../Const';

function Discussion({ taskId }) {
  const iconName = useSelector(selectName);
  const [alertDelete, setAlertDelete] = useState(false);
  const [edit, setEdit] = useState(null);
  const [discus, setDiscus] = useState(null);
  const [discusId, setDiscusId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEdit = (discusId) => {
    setEdit(discusId);
  }
  const handleDelete = (discusId) => {
    setAlertDelete(true)
    setDiscusId(discusId)
  }

  useEffect(() => {
    axios.post(BASE_URL + 'tasks/getDiscus', { taskId: taskId })
      .then((response) => {
        setDiscus(response.data);
        setLoading(false);
      })// eslint-disable-next-line
  }, [alertDelete])

  return (
    <> {loading ?
      <p></p>
      :
      <>
        {discus.map((itemDiscus, index) => {
          dayjs.extend(relativeTime)
          dayjs.extend(buddhistEra)
          return <div className="flex mt-2 relative" key={index}>
            {edit !== itemDiscus.discusId ? <>
              <div className="mt-2 mr-1">
                <AvatarName name={itemDiscus.createdBy} />
              </div>
              <p className="text-sm opacity-80 absolute left-10 top-4">
                {itemDiscus.createdBy}
                <span title={dayjs(itemDiscus.createdDate).locale('th').format('DD MMMM BBBB HH:mm:ss')}
                  className='hover:underline text-xs mx-1'>commented {dayjs(itemDiscus.createdDate).fromNow()}
                </span>
                {itemDiscus.createdDate !== itemDiscus.updateDate &&
                  <span title={"Edited "+dayjs(itemDiscus.updateDate).locale('th').format('DD MMMM BBBB HH:mm:ss')}
                    className={`hover:underline text-xs`}>(edited)</span>}
              </p>
              <TextareaAutosize minRows={4}
                autoFocus className="text-sm border w-full mt-2 p-1 focus:outline-none focus:border-blue-500 resize-none overflow-hidden text-black bg-white disabled"
                value={`\n${itemDiscus.comment}`} disabled />
              {itemDiscus.createdBy === iconName &&
                <div className="flex items-center absolute top-3 right-2">
                  <img src="https://www.svgrepo.com/show/22072/edit.svg" className='w-4 h-4 mr-3 cursor-pointer hover:bg-gray-200 ' alt="" onClick={() => handleEdit(itemDiscus.discusId)} />
                  <img src="https://www.svgrepo.com/show/244048/delete.svg" className='w-4 h-4 cursor-pointer hover:bg-gray-200 ' onClick={() => handleDelete(itemDiscus.discusId)} alt="" />
                </div>
              }
              <ConfirmDeleteDiscus discusId={discusId} open={alertDelete} setOpen={setAlertDelete} />
            </>
              :
              <EditDiscussion discus={itemDiscus} setEdit={setEdit} setDiscus={setDiscus} setLoading={setLoading}/>
            }
          </div>
        })}
      </>}
    </>
  )
}

export default Discussion