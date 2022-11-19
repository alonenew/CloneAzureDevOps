import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../../Const';
import axios from 'axios';
import { useSelector } from 'react-redux'
import Deployment from './Deployment';
import Related from '../parent/Related';
import { selectSearch } from '../../../store/slices/itemSlice';
import { useParams } from 'react-router-dom';
import Planning from './Planning';
import Description from './Description';
import { selectName } from '../../../store/slices/authSlice';
import HeaderDetail from './HeaderDetail';
import { selectRelation } from '../../../store/slices/relationSlice';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Discussion from './Discussion';


function DetailModal({ setOpen }) {
    const { id } = useParams();
    const relation = useSelector(selectRelation);
    const customerId = localStorage.getItem('id');
    const taskId = useSelector(selectSearch);
    const [description, setDescription] = useState();
    const [acceptance, setAcceptance] = useState();
    const [name, setName] = useState();
    const [discussion, setDiscussion] = useState();
    const [assign, setAssign] = useState();
    const [status, setStatus] = useState();
    const [storyPoint, setStoryPoint] = useState();
    const [priority, setPriority] = useState();
    const [risk, setRisk] = useState();
    const [area, setArea] = useState();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState();
    const iconName = useSelector(selectName);
    const classes = "relative text-black py-2 pl-4 pr-6 flex justify-between";
    const [openDiscussion, setOpenDiscussion] = useState(true);

    useEffect(() => {
        axios.post(BASE_URL + "tasks/gettaskid", { taskId: taskId ? taskId : id })
            .then(async (res) => {
                setItem(res.data.data)
                setDescription(res.data.data.description)
                setAcceptance(res.data.data.acceptance)
                setName(res.data.data.name)
                setAssign(res.data.data.assign)
                setStatus(res.data.data.status)
                setStoryPoint(res.data.data.storyPoint)
                setPriority(res.data.data.priority)
                setRisk(res.data.data.risk)
                setArea(res.data.data.area)
                await new Promise(resolve => setTimeout(resolve, 100));
                setLoading(false)
            })// eslint-disable-next-line
    }, [])

    const submit = (e) => {
        e.preventDefault();
        if (status !== "Removed") {
            let data = {
                taskId: item.taskId,
                customerId: customerId,
                name,
                description,
                acceptance,
                discussion,
                status,
                assign,
                storyPoint,
                priority,
                risk,
                area,
                createdBy: iconName,
            }
            axios.patch(BASE_URL + "tasks/adddetail", data);
            if (relation.relationShip.length > 0) {
                for (let i = 0; i < relation.relationShip.length; i++) {
                    axios.post(BASE_URL + "relation/addRelation", relation.relationShip[i])
                }
            }
        } else {
            axios.delete(BASE_URL + "tasks/remove", { data: { taskId: item.taskId } })
        }
        window.location.reload();
    }
    console.log(item);
    if(!item){
       return setItem({
            "discussion": [
                {
                    "discusId": "20221117d8657814-27bd-4e70-b2fc-0c474401ca85",
                    "customerId": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a",
                    "taskId": 1,
                    "comment": "Test discussion",
                    "createdDate": "2022-11-17T11:34:27.000+00:00",
                    "createdBy": "Sittichai Thammawat",
                    "updateDate": "2022-11-17T11:34:27.000+00:00",
                    "updateBy": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a"
                },
                {
                    "discusId": "2022111748b0f04d-47a0-4272-af70-d1a15d40bc2b",
                    "customerId": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a",
                    "taskId": 1,
                    "comment": "Test discussion",
                    "createdDate": "2022-11-17T11:32:10.000+00:00",
                    "createdBy": "Sittichai Thammawat",
                    "updateDate": "2022-11-17T11:32:10.000+00:00",
                    "updateBy": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a"
                },
                {
                    "discusId": "2022111710328124-539f-43d3-bb6b-1b5bf194b7a7",
                    "customerId": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a",
                    "taskId": 1,
                    "comment": "Update Comment",
                    "createdDate": "2022-11-17T09:11:47.000+00:00",
                    "createdBy": "Sittichai Thammawat",
                    "updateDate": "2022-11-17T13:54:33.000+00:00",
                    "updateBy": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a"
                }
            ],
            "relations": [
                {
                    "relationId": "202210261b032864-2353-407b-8a4e-c2f8325c1fb4",
                    "linkType": 1,
                    "taskId": 1,
                    "taskLink": 4,
                    "comment": null,
                    "createdDate": "2022-10-26T08:05:04.000+00:00",
                    "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
                    "updateDate": "2022-10-26T08:05:04.000+00:00",
                    "updateBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef"
                },
                {
                    "relationId": "202210263dbb1fe1-2677-4a6b-aa33-47a28dfecc56",
                    "linkType": 2,
                    "taskId": 1,
                    "taskLink": 6,
                    "comment": null,
                    "createdDate": "2022-10-26T08:05:22.000+00:00",
                    "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
                    "updateDate": "2022-10-26T08:05:22.000+00:00",
                    "updateBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef"
                },
                {
                    "relationId": "202210268c19833c-6367-401a-bf35-8a54b089b1bf",
                    "linkType": 2,
                    "taskId": 1,
                    "taskLink": 5,
                    "comment": null,
                    "createdDate": "2022-10-26T08:05:22.000+00:00",
                    "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
                    "updateDate": "2022-10-26T08:05:22.000+00:00",
                    "updateBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef"
                }
            ],
            "taskId": 1,
            "customerId": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a",
            "name": "Test add new item",
            "status": "Active",
            "type": "User Story",
            "assign": "20221024c4b5c5c2-2684-42fd-b4f5-428563da2993",
            "priority": 2,
            "storyPoint": 2,
            "risk": 1,
            "area": 1,
            "description": "",
            "acceptance": "",
            "createdDate": "2022-10-24T12:36:03.000+00:00",
            "createdBy": "2022102498ac160b-a72f-4940-8fa1-eff78251b7ef",
            "updateDate": "2022-11-17T13:27:35.000+00:00",
            "updateBy": "20221024b697eda5-dd04-44fe-8e5a-ece3f4db786a"
        })
    }
    
    return (
        <>
            {!loading ?
                <>
                    {/* Header */}
                    <HeaderDetail item={item} setOpen={setOpen} setStatus={setStatus}
                        assign={assign} setAssign={setAssign} submit={submit} name={name} setName={setName} />

                    {/* Body */}
                    <Box className={classes}>

                        {/* Tab Description */}
                        <Box className="w-1/2 mb-5">
                            <Description item={item} setDescription={setDescription}
                                setAcceptance={setAcceptance}  />
                            <Box className="header-details" onClick={() => setOpenDiscussion(!openDiscussion)}>
                                <Typography variant='body1' >Discussion</Typography>
                            </Box>
                            {openDiscussion
                                ? <Discussion taskId={item.taskId} setDiscussion={setDiscussion} />
                                : ''
                            }
                        </Box>

                        {/* Tab Planning */}
                        <Box className="grow mx-4">
                            <Planning item={item} setStoryPoint={setStoryPoint}
                                setPriority={setPriority} setRisk={setRisk} setArea={setArea} />
                        </Box>

                        {/* Tab Deployment */}
                        <Box className=" w-1/4 ">
                            <Deployment />
                            <Related item={item} />
                        </Box>

                    </Box>
                </>
                : null
            }
        </>
    )
}

export default DetailModal