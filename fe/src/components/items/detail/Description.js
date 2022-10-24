import React, { useState } from 'react'
import Discussion from './Discussion';
import AvatarName from '../../layouts/AvatarName';
import TextareaAutosize from 'react-textarea-autosize';
import { selectName } from '../../../store/slices/authSlice';
import { useSelector } from 'react-redux'

function Description({item, setDescription, setAcceptance, setDiscussion }) {
    const [openDescription, setOpenDescription] = useState(true);
    const [openAcceptance, setOpenAcceptance] = useState(true);
    const [openDiscussion, setOpenDiscussion] = useState(true);
    const iconName = useSelector(selectName);
    return (
        <>
            <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 " onClick={() => setOpenDescription(!openDescription)}>
                <h4>Description</h4>
            </div>
            {openDescription ? <TextareaAutosize minRows={3} onChange={e => setDescription(e.target.value)}
                placeholder={"Click to add Description"} autoFocus defaultValue={item.description}
                className="text-sm border w-full mt-2 p-1 focus:outline-none focus:border-blue-500 resize-none overflow-hidden " /> : ''}
            <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 mt-2" onClick={() => setOpenAcceptance(!openAcceptance)}>
                <h4>Acceptance Criteria</h4>
            </div>
            {openAcceptance ? <TextareaAutosize minRows={3} onChange={e => setAcceptance(e.target.value)}
                placeholder={"Click to add Acceptance Criteria"} autoFocus defaultValue={item.acceptance}
                className="h-16 text-sm border w-full mt-2 p-1 focus:outline-none focus:border-blue-500 resize-none overflow-hidden " /> : ''}
            <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 mt-2" onClick={() => setOpenDiscussion(!openDiscussion)}>
                <h4>Discussion</h4>
            </div>
            {openDiscussion ?
                <>
                    <div className="flex">
                        <div className="mt-2 mr-1">
                            <AvatarName name={iconName} />
                        </div>
                        <TextareaAutosize minRows={4} onChange={e => setDiscussion(e.target.value)}
                            placeholder={"Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person."}
                            autoFocus className="text-sm border w-full mt-2 p-1 focus:outline-none focus:border-blue-500 resize-none overflow-hidden "
                        />
                    </div>
                    <Discussion taskId={item.taskId} />
                </>
                : ''
            }
        </>
    )
}

export default Description