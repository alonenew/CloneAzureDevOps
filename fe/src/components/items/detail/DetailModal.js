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


function DetailModal({ setOpen }) {
    const { id } = useParams();
    const customerId = localStorage.getItem('id');
    const taskId = useSelector(selectSearch);
    const [description, setDescription] = useState();
    const [acceptance, setAcceptance] = useState();
    const [name,setName] = useState();
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

    const submit = async (e) => {
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
            console.log(data);
            axios.patch(BASE_URL + "tasks/adddetail", data);
        } else {
            axios.delete(BASE_URL + "tasks/remove", { data: { taskId: item.taskId } })
        }
        window.location.reload();
    }

    return (
        <>
            {!loading ? 
                <>
                    {/* Header */}
                    <HeaderDetail item={item} setOpen={setOpen} setStatus={setStatus} 
                    assign= {assign} setAssign={setAssign} submit={submit} name={name} setName={setName}/>

                    {/* Body */}
                    <div className="relative text-black py-2 pl-4 pr-6 flex justify-between">

                        {/* Tab Description */}
                        <div className="w-1/2 mb-5">
                            <Description item={item} setDescription={setDescription} 
                            setAcceptance={setAcceptance} setDiscussion={setDiscussion} />
                        </div>

                        {/* Tab Planning */}
                        <div className="grow mx-4">
                            <Planning item={item} setStoryPoint={setStoryPoint} 
                            setPriority={setPriority} setRisk={setRisk} setArea={setArea} />
                        </div>

                        {/* Tab Deployment */}
                        <div className=" w-1/4 ">
                            <Deployment />
                            <Related item={item} />
                        </div>

                    </div>
                </> 
                :  null
            }
        </>
    )
}

export default DetailModal