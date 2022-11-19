import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react'

function Planning({ item, setStoryPoint, setPriority, setRisk, setArea }) {
    const [openPlanning, setOpenPlanning] = useState(true);
    const [openClassifacation, setOpenClassifacation] = useState(true);
    return (
        <>
            <Box className="header-details" onClick={() => setOpenPlanning(!openPlanning)}>
                <Typography variant='body1' >Planning</Typography>
            </Box>
            {openPlanning ?
                <>
                    <Typography variant='caption'>Story Point</Typography>
                    <input onChange={(e) => setStoryPoint(e.target.value)} defaultValue={item.storyPoint}
                        className='input-detail ' />
                    <Typography variant='caption' className="mt-2">Priority</Typography><br />
                        <select onChange={(e) => setPriority(e.target.value)} className='select-status w-full bg-white' defaultValue={item.priority}>
                            <option value='' hidden></option>
                            <option value={1}> 1 </option>
                            <option value={2}> 2 </option>
                            <option value={3}> 3 </option>
                            <option value={4}> 4 </option>
                        </select>
                    <Typography variant='caption' className="mt-2">Risk</Typography><br />
                    <select onChange={(e) => setRisk(e.target.value)} className='select-status w-full bg-white' defaultValue={item.risk ? item.risk : ""}>
                        <option value='' hidden></option>
                        <option value={1}> 1 - High</option>
                        <option value={2}> 2 - Medium </option>
                        <option value={3}> 3 - Low</option>
                    </select>
                </>
                :
                ''
            }
            <Box className="header-details" onClick={() => setOpenClassifacation(!openClassifacation)}>
                <Typography variant='body1' >Classification</Typography>
            </Box>
            {openClassifacation ?
                <>
                    <Typography variant='caption'>Value area</Typography><br />
                    <select onChange={(e) => setArea(e.target.value)} className='select-status w-full bg-white' defaultValue={item.area}>
                        <option value='' hidden></option>
                        <option value={1}> Business  </option>
                        <option value={2}> Architectural </option>
                    </select>
                </>
                :
                ''
            }
        </>
    )
}

export default Planning