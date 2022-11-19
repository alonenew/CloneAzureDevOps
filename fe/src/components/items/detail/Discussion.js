import React, { useEffect, useState } from 'react'
import ConfirmDeleteDiscus from './ConfirmDeleteDiscus';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th'
import { selectName } from '../../../store/slices/authSlice';
import { useSelector } from 'react-redux'
import EditDiscussion from './EditDiscussion';
import axios from 'axios';
import { BASE_URL } from '../../../Const';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AvatarName from '../../layouts/AvatarName';
import Textarea from 'react-textarea-autosize';

function Discussion({ taskId, setDiscussion }) {
  const iconName = useSelector(selectName);
  const [alertDelete, setAlertDelete] = useState(false);
  const [edit, setEdit] = useState(null);
  const [discus, setDiscus] = useState([]);
  const [discusId, setDiscusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discuss, setDiscuss] = useState();
  
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
      });
    // eslint-disable-next-line
      setLoading(false);

  }, [alertDelete])
  console.log(discus);
  // if(discus.length<1){
  //   return setDiscus([
  //     {
  //       "discusId": "202211147fc59e74-3524-4bfe-aa12-85387a8dbd32",
  //       "customerId": "2022110721603436-942c-4d75-bfed-9d553ae83ab3",
  //       "taskId": 1,
  //       "comment": "Old Comment",
  //       "createdDate": "2022-11-14T06:02:35.000+00:00",
  //       "createdBy": "Sittichai Thammawat",
  //       "updateDate": "2022-11-14T06:02:35.000+00:00",
  //       "updateBy": "2022110721603436-942c-4d75-bfed-9d553ae83ab3"
  //     }
  //   ]);
  // }
  return (
    <> {loading ?
      <Typography variant="body2"></Typography>
      :
      <>
        <Box className="flex">
            <Box className="mt-2 mr-1">
                <AvatarName name={iconName? iconName : "สิทธิชัย ธรรมวัตร"} />
            </Box>
            <Textarea minRows={4} 
                onChange={e => setDiscussion(e.target.value)}
                placeholder={"Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person."}
                autoFocus className="area-textbox"
                data-testid="inputDiscus" 
            />
        </Box>
        {discus.map((itemDiscus, index) => {
          dayjs.extend(relativeTime)
          dayjs.extend(buddhistEra)
          return <Box className="flex mt-2 relative" key={index}>
            {edit !== itemDiscus.discusId ? <>
              <Box className="mt-2 mr-1">
                <AvatarName name={itemDiscus.createdBy} />
              </Box>
              <Box className="opacity-80 absolute left-10 top-4 ">
                <Typography variant='caption'>{itemDiscus.createdBy} </Typography>
                <Typography variant='caption' title={dayjs(itemDiscus.createdDate).locale('th').format('DD MMMM BBBB HH:mm:ss')}
                  className='hover:underline text-xs mx-1'>commented {dayjs(itemDiscus.createdDate).fromNow()}
                </Typography>
                {itemDiscus.createdDate !== itemDiscus.updateDate &&
                  <Typography variant='caption' title={"Edited " + dayjs(itemDiscus.updateDate).locale('th').format('DD MMMM BBBB HH:mm:ss')}
                    className={`hover:underline text-xs`}>(edited)</Typography>}
              </Box>
              <Textarea minRows={4}
                autoFocus className="area-textbox text-black bg-white pt-2"
                value={`\n${itemDiscus.comment}`} disabled />
              {itemDiscus.createdBy === iconName &&
                <Box className="flex items-center absolute top-3 right-2">
                  <img src="https://www.svgrepo.com/show/22072/edit.svg" className='cursor-pointer w-4 mr-3' alt=""
                    onClick={() => handleEdit(itemDiscus.discusId)} />
                  <img src="https://www.svgrepo.com/show/244048/delete.svg" className='cursor-pointer w-4'
                    onClick={() => handleDelete(itemDiscus.discusId)} alt="" />
                </Box>
              }
              <ConfirmDeleteDiscus discusId={discusId} open={alertDelete} setOpen={setAlertDelete} />
            </>
              :
              <EditDiscussion discus={itemDiscus} setEdit={setEdit} setDiscus={setDiscus} setLoading={setLoading} />
            }
          </Box>
        })}
      </>}
    </>
  )
}

export default Discussion