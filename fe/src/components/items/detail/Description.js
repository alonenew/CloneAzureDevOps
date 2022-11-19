import React, { useState } from 'react';
import Textarea from 'react-textarea-autosize';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Description({item, setDescription, setAcceptance }) {
    const [openDescription, setOpenDescription] = useState(true);
    const [openAcceptance, setOpenAcceptance] = useState(true);
    return (
        <>
            <Box className="header-details" onClick={() => setOpenDescription(!openDescription)}>
                <Typography variant='body1' >Description</Typography>
            </Box>
            {openDescription ? 
                <Textarea minRows={3} 
                    onChange={e => setDescription(e.target.value)}
                    data-testid="inputDescription"
                    placeholder={"Click to add Description"} 
                    autoFocus defaultValue={item.description}
                    className="area-textbox" /> : ''}
                    
            <Box className="header-details" onClick={() => setOpenAcceptance(!openAcceptance)}>
                <Typography variant='body1' >Acceptance Criteria</Typography>
            </Box>
            {openAcceptance ? 
                <Textarea minRows={3} 
                    onChange={e => setAcceptance(e.target.value)}
                    data-testid="inputAcceptance"
                    placeholder={"Click to add Acceptance Criteria"} 
                    autoFocus defaultValue={item.acceptance}
                    className="area-textbox" /> : ''}
            
        </>
    )
}

export default Description