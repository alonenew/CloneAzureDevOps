import React, { useState } from 'react'

function Deployment() {
    const [openDeployment, setOpenDeployment] = useState(true);
    const [openDevelopment, setOpenDevelopment] = useState(true);

  return (
    <>
        <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 " onClick={() => setOpenDeployment(!openDeployment)}>
                        <h4>Deployment</h4>
                    </div>
                    {openDeployment ?
                        <div className="text-xs p-2 bg-gray-100 mt-2 flex items-center">
                            <img src="https://cdn.vsassets.io/ext/ms.vss-build-web/common-library/Nav-Launch.3tiJhd.png" className="w-8 h-8 mr-2" alt="" />
                            Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.</div>
                        : ''
                    }
                    <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 mt-2" onClick={() => setOpenDevelopment(!openDevelopment)}>
                        <h4>Development</h4>
                    </div>
                    {openDevelopment ?
                        <div className=" text-xs p-2 bg-gray-100 mt-2 flex items-center">
                            <img src="https://cdn.vsassets.io/ext/ms.vss-code-web/common-content/Nav-Code.0tJczm.png" className="w-8 h-8 mr-2" alt="" />
                            Link an Azure Repos commit, pull request or branch to see the status of your development. You can also create a branch to get started.</div>
                        : ''
                    }
    </>
  )
}

export default Deployment