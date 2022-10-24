import React,{useState} from 'react'

function Planning({item, setStoryPoint, setPriority, setRisk, setArea}) {
    const [openPlanning, setOpenPlanning] = useState(true);
    const [openClassifacation, setOpenClassifacation] = useState(true);
  return (
    <>
        <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 " onClick={() => setOpenPlanning(!openPlanning)}>
                        <h4>Planning</h4>
                    </div>
                    {openPlanning ?
                        <>
                            <span className="text-xs">Story Point</span>
                            <input onChange={(e) => setStoryPoint(e.target.value)} defaultValue={item.storyPoint}
                                className='box-border hover:outline focus:outline outline-1 outline-cyan-500 px-1 text-black w-full text-sm ' />

                            <span className="text-xs mt-2">Priority</span>
                            <select onChange={(e) => setPriority(e.target.value)} className='box-border hover:outline focus:outline outline-1 outline-cyan-500 px-1 text-black w-full text-sm appearance-none' defaultValue={item.priority}>
                                <option value='' hidden></option>
                                <option value={1}> 1 </option>
                                <option value={2}> 2 </option>
                                <option value={3}> 3 </option>
                                <option value={4}> 4 </option>
                            </select>
                            <span className="text-xs mt-2">Risk</span>
                            <select onChange={(e) => setRisk(e.target.value)} className='box-border hover:outline focus:outline outline-1 outline-cyan-500 px-1 text-black w-full text-sm appearance-none' defaultValue={item.risk ? item.risk : ""}>
                                <option value='' hidden></option>
                                <option value={1}> 1 - High</option>
                                <option value={2}> 2 - Medium </option>
                                <option value={3}> 3 - Low</option>
                            </select>
                        </>
                        :
                        ''
                    }
                    <div className="hover:text-blue-900 hover:border-blue-200 border-b-2 pb-1 mt-2" onClick={() => setOpenClassifacation(!openClassifacation)}>
                        <h4>Classification</h4>
                    </div>
                    {openClassifacation ?
                        <>
                            <span className="text-xs">Value area</span>
                            <select onChange={(e) => setArea(e.target.value)} className='box-border hover:outline focus:outline outline-1 outline-cyan-500 px-1 text-black w-full text-sm appearance-none' defaultValue={item.area}>
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