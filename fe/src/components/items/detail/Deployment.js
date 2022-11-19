import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react'

function Deployment() {
    const [openDeployment, setOpenDeployment] = useState(true);
    const [openDevelopment, setOpenDevelopment] = useState(true);

  return (
    <>
        <Box className="header-details" onClick={() => setOpenDeployment(!openDeployment)}>
            <Typography variant='body1'>Deployment</Typography>
        </Box>
        {openDeployment ?
            <Box className="details-deployment">
                <img src="https://cdn.vsassets.io/ext/ms.vss-build-web/common-library/Nav-Launch.3tiJhd.png" className="img-deployment" alt="" />
                Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.</Box>
            : ''
        }
        <Box className="header-details" onClick={() => setOpenDevelopment(!openDevelopment)}>
            <Typography variant='body1' >Development</Typography>
        </Box>
        {openDevelopment ?
            <Box className="details-deployment">
                <img src="https://cdn.vsassets.io/ext/ms.vss-code-web/common-content/Nav-Code.0tJczm.png" className="img-deployment" alt="" />
                Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.
            </Box>
            : ''
        }
    </>
  )
}

export default Deployment